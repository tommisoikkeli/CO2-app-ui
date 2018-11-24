import * as React from 'react';

interface IButtonProps {
  onClick?: () => void;
  text: string;
  className?: string;
  type: ButtonType;
  disabled?: boolean;
}

export enum ButtonType {
  DEFAULT = 'default'
}

export const Button: React.SFC<IButtonProps> = ({onClick, text, className, type, disabled}) => {
  const additionalClass = className ? className : '';
  return (
    <button className={`button-container ${type} ${additionalClass}`}>
      <div className='button-content' onClick={onClick}>
        <span>{text}</span>
      </div>
    </button>
  );
};
