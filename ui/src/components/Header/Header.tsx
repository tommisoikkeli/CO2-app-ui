import * as React from 'react';

interface IHeaderProps {
  title: string;
}

export const Header: React.SFC<IHeaderProps> = ({title}) => (
  <div className='header'>
    <h1>{title}</h1>
  </div>
);
