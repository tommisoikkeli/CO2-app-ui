const express = require('express');
const request = require('request');
const cors = require('cors');
const converter = require('./countryNameConverter');

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

const PER_PAGE = 60;
const API_BASE_URL = 'https://api.worldbank.org/v2/countries/';
const POPULATION_INDICATOR_URL = `/indicators/SP.POP.TOTL?format=json&per_page=${PER_PAGE}`;
const EMISSIONS_INDICATOR_URL = `/indicators/EN.ATM.CO2E.KT?format=json&per_page=${PER_PAGE}`;

app.get('/api/population', (req, res) => {
  const country = converter.countryNameToISOCode(req.query.country);
  request(API_BASE_URL + country + POPULATION_INDICATOR_URL, (error, response) => {
    if (error) {
      console.error(error);
    }
    res.send(response.body);
  });
});

app.get('/api/emissions', (req, res) => {
  const country = converter.countryNameToISOCode(req.query.country);
  request(API_BASE_URL + country + EMISSIONS_INDICATOR_URL, (error, response) => {
    if (error) {
      console.error(error);
    }
    res.send(response.body);
  });
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
