import * as React from 'react';
import {ClipLoader} from 'react-spinners';

export const Loading: React.SFC = () => (
  <ClipLoader sizeUnit={'px'} size={100} color={'#70a280aa'} />
);
