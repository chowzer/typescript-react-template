import { createStyles, makeStyles } from '@material-ui/core';
import React, { ReactNode } from 'react';

interface BackgroundProp {
  className?: string;
  backgroundUrl: string;
  style: any;
  children?: ReactNode;
}

const useStyle = makeStyles(() =>
  createStyles({
    fixedBackground: {
      zIndex: -1,
      minHeight: 450,
      width: '100%',
      backgroundSize: 'cover',
    },
    dark: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      color: '#ffffff',
      padding: '122 32',
    },
  })
);

function FixedBackground(prop: BackgroundProp) {
  const classes = useStyle();
  const bgCSS = {
    backgroundImage: `url('${prop.backgroundUrl}')`,
  };

  return (
    <div className={prop.className} style={prop.style}>
      <div className={classes.fixedBackground} style={bgCSS}>
        <div className={classes.dark}>{prop.children}</div>
      </div>
    </div>
  );
}

export default FixedBackground;
