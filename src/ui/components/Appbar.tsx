import React from 'react';
import {
  makeStyles,
  createStyles,
  AppBar,
  Toolbar,
  IconButton,
  Theme,
  Typography,
  MenuItem,
} from '@material-ui/core';
import { IconType } from 'react-icons/lib/cjs';
import Icon from './Icon';

interface AppbarProp {
  pageName: string;
  menuIcon: {
    icon: IconType;
    className?: string;
    fontSize: number;
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      position: 'fixed',
      textTransform: 'uppercase',
      fontSize: '15px ',
      letterSpacing: '1.6px',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    iconTypography: {
      color: '#ffffff',
    },
  })
);

export default function Appbar(prop: AppbarProp) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            aria-label="menu"
            onClick={() => {
              window.location.href = '#';
            }}>
            <Icon
              className={classes.iconTypography}
              icon={prop.menuIcon.icon}
              fontSize={prop.menuIcon.fontSize}
            />
          </IconButton>
          <Typography className={classes.title} variant="h6">
            {prop.pageName}
          </Typography>
          <MenuItem>item1</MenuItem>
          <MenuItem>item2</MenuItem>
        </Toolbar>
      </AppBar>
    </div>
  );
}
