import { createStyles, makeStyles } from '@material-ui/core';
import React, { ReactNode } from 'react';

interface JumboProp {
  children?: ReactNode;
  className?: string;
}

const useStyle = makeStyles(() =>
  createStyles({
    jumbotron: {
      marginBottom: 0,
      padding: '32px, 0, 0, 56px',
      borderRadius: 0,
    },
    narrow: {
      width: '75%',
      margin: '24px auto',
      padding: '32px 0 32px 0',
      alignItems: 'center',
      textAlign: 'center',
    },
  })
);

export default function Jumbotron(props: JumboProp) {
  const classes = useStyle();
  return (
    <div className={props.className}>
      <div className={classes.jumbotron}>
        <div className={classes.narrow}>{props.children}</div>
      </div>
    </div>
  );
}
