import React, { ReactElement } from 'react';
import { Typography } from '@material-ui/core';

interface Props {}

export default function Error({}: Props): ReactElement {
  return (
    <div>
      <Typography> 404 </Typography>
    </div>
  );
}
