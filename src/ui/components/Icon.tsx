import React from 'react';
import { IconType } from 'react-icons/lib/cjs';
import { Typography, Box, makeStyles } from '@material-ui/core';

interface IconProp {
  icon: IconType;
  className?: string;
  fontSize: number;
}

const Icon = (props: IconProp) => {
  const icon = React.createElement(props.icon);

  return (
    <Box className={props.className} fontSize={props.fontSize}>
      {icon}
    </Box>
  );
};

export default Icon;
