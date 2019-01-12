import * as React from 'react';

interface ICheckboxProps {
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
  checked: boolean;
}

export const Checkbox: React.SFC<ICheckboxProps> = ({
  label,
  onChange,
  name,
  className,
  checked
}) => {
  const additionalClass = className ? className : '';
  return (
    <div className={`checkbox-container ${additionalClass}`}>
      <input type='checkbox' onChange={onChange} id={name} checked={checked}/>
      <label htmlFor={name}>
        <span>{label}</span>
      </label>
    </div>
  );
};
