import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { Fragment, ReactElement, ReactNode } from 'react';

interface ImageProps {
  backgroundUrl: string;
  title?: string;
  paragraph?: string;
  className?: string;
  children?: ReactNode;
}

export default function ImageBlock(prop: ImageProps): ReactElement {
  const useStyle = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        padding: 50,
      },
      imgBlock: {
        backgroundSize: 'cover',
      },
      img: {
        maxHeight: '100%',
        maxWidth: '100%',
      },
      textBlock: {
        alignItems: 'center',
        alignContent: 'center',
      },
      hRule: {
        margin: '2px 25% 15px 25%',
        height: 2,
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.dark,
      },
      child: {
        margin: 10,
        justifyContent: 'center',
      },
    })
  );

  const classes = useStyle();

  return (
    <Fragment>
      <div className={classes.imgBlock}>
        <img className={classes.img} src={prop.backgroundUrl} />
      </div>
      <div className={classes.textBlock}>
        <Typography variant={'h3'}>{prop.title}</Typography>
        <hr className={classes.hRule} />
        <Typography variant={'body1'}>{prop.paragraph}</Typography>
        <div className={classes.child}> {prop.children}</div>
      </div>
    </Fragment>
  );
}
