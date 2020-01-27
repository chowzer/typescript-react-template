import { Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';

function Gear(): ReactElement {
  console.log('does it load?');
  return (
    <div>
      <Typography variant={'h1'}>Gear</Typography>
    </div>
  );
}

export default Gear;
