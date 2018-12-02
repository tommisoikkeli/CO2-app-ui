import * as React from 'react';

interface IClearFieldButtonProps {
  onClick: () => void;
}

export const ClearFieldButton: React.SFC<IClearFieldButtonProps> = ({onClick}) => (
  <div className='clear-field-button-container' onClick={onClick}>
    <i className='material-icons clear-field-button'>clear</i>
  </div>
);
