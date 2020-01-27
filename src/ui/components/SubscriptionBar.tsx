import { Component, Fragment } from 'react';
import React from 'react';
import { makeStyles, createStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    grid: {
      display: 'flex',
    },
  })
);

export default function SubscriptionBar() {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid className={classes.grid}></Grid>
    </Fragment>
  );
}
