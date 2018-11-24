import * as React from 'react';
import {ClearFieldButton} from './ClearFieldButton';

interface ITextInputProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearButtonClick: () => void;
}

export const TextInput: React.SFC<ITextInputProps> = ({
  placeholder,
  value,
  onChange,
  onClearButtonClick
}) => {
  const clearFieldButton =
    value.length > 0 ? <ClearFieldButton onClick={onClearButtonClick} /> : null;
  return (
    <div className='input-container'>
      <input
        type='text'
        className='text-input'
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
      {clearFieldButton}
    </div>
  );
};
