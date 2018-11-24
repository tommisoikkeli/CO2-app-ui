import * as React from 'react';
import TextInput from '../TextInput/TextInput';
import {Button, ButtonType} from '../Button/Button';

export const Search: React.SFC = () => {
  return (
    <div className='search'>
      <TextInput placeholder='Search for a country' />
      <Button
        text='Search'
        type={ButtonType.DEFAULT}
        onClick={() => console.log('yaah')}
        className='search-button'
      />
    </div>
  );
};
