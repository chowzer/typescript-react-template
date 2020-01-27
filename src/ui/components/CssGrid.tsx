import React, { ReactElement, ReactNode } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';

interface GridProps {
  columns: number;
  children?: ReactNode;
}

export default function CssGrid(prop: GridProps): ReactElement {
  const columnCount = `repeat(${prop.columns}, 1fr)`;

  const useStyle = makeStyles(() =>
    createStyles({
      root: {
        display: 'grid',
        gridTemplateColumns: columnCount,
        gridGap: '1em',
        gridAutoRows: 'minmax(200px, auto)',
        gridAutoColumns: 'minmax(200px, auto)',
      },
    })
  );

  const classes = useStyle();

  return <div className={classes.root}>{prop.children}</div>;
}
