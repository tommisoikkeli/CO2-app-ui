import * as React from 'react';

interface IResultsHeaderProps {
  countries: string[];
  onClick: (country: string) => void;
}

export const ResultsHeader: React.SFC<IResultsHeaderProps> = ({
  countries,
  onClick
}): JSX.Element => {
  const mapCountries = (): JSX.Element[] =>
    countries.map((country: string) => (
      <div className='searched-country' key={`country-${country}`}>
        <span>{country}</span>
        <span className='clear-country-button' onClick={() => onClick(country)}>
          x
        </span>
      </div>
    ));

  return <div className='results-header'>{mapCountries()}</div>;
};
