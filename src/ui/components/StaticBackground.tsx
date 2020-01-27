import { createStyles, makeStyles } from '@material-ui/core';
import React, { ReactElement, ReactNode } from 'react';

interface sbProps {
  children?: ReactNode;
}

const useStyle = makeStyles(() =>
  createStyles({
    landing: {
      flexGrow: 1,
      position: 'relative',
      width: '100%',
      height: '100vh',
      display: 'table',
      zIndex: -1,
    },
    homeWrap: {
      clip: 'rect(0, auto, auto, 0)',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    homeInner: {
      backgroundColor: '#7b7267',
      position: 'fixed',
      display: 'table',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      WebkitTransform: 'translateZ(0)',
      transform: 'translateZ(0)',
      willChange: 'transform',
    },
  })
);

function StaticBackground(prop: sbProps) {
  const classes = useStyle();
  return (
    <div className={classes.landing}>
      <div className={classes.homeWrap}>
        <div className={classes.homeInner}>{prop.children}</div>
      </div>
    </div>
  );
}

export default StaticBackground;
