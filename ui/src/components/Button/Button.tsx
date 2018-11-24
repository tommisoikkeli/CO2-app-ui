import * as React from 'react';

interface IButtonProps {
  onClick: () => void;
  text: string;
  type: ButtonType;
  className?: string;
  disabled?: boolean;
}

export enum ButtonType {
  DEFAULT = 'default'
}

export const Button: React.SFC<IButtonProps> = ({
  onClick,
  text,
  type,
  className,
  disabled
}) => {
  const additionalClass = className ? className : '';
  return (
    <button
      className={`button-container ${type} ${additionalClass}`}
      onClick={onClick}
      disabled={disabled}>
      <div className='button-content'>
        <span>{text}</span>
      </div>
    </button>
  );
};
