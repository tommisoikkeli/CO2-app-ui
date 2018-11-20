const countries = require('i18n-iso-countries');

module.exports = {
  countryNameToISOCode: function(country) {
    return countries.getAlpha3Code(country, 'en');
  }
}
