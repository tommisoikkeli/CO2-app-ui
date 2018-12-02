import * as React from 'react';

interface ISuggestionsProps {
  items: string[];
  isVisible: boolean;
  onItemClick: (item: string) => void;
}

export const Suggestions: React.SFC<ISuggestionsProps> = ({items, isVisible, onItemClick}) => {
  const getSuggestions = (): JSX.Element[] => {
    return items.map((item: string, index: number) => (
      <div className="suggestion-item" key={`suggestion-${index}`} onClick={() => onItemClick(item)}>
        {item}
      </div>
    ));
  }

  const noResultsFound = (): JSX.Element => (
    <div className="suggestions-no-results">
      <span>No countries found!</span>
    </div>
  )
  
  return (
    <div className={`suggestions-container ${isVisible ? 'visible' : ''}`}>
      {getSuggestions()}
      {isVisible && !items.length && noResultsFound()}
    </div>
  )
}