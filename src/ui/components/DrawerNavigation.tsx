import {
  AppBar,
  createStyles,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { IoIosMenu } from 'react-icons/io';
import { IconType } from 'react-icons/lib/cjs';
import { Route, Switch } from 'react-router-dom';
import DrawerItem from './DrawerItem';

interface NavProps {
  title: string;
  pages: {
    path: string;
    name: string;
    component: any;
    icon: IconType;
  }[];
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      background: theme.palette.primary.main,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    title: {
      paddingLeft: '5px',
    },
    main: {
      margin: '60px 0 0 20px',
    },
  })
);

export default function DrawerNavigation(NavProps: NavProps) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}>
          <Toolbar>
            <IconButton onClick={handleDrawerOpen}>
              <IoIosMenu size={35}></IoIosMenu>
            </IconButton>
            <Typography className={classes.title} variant={'h4'}>
              {NavProps.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}>
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <FiChevronsRight />
              ) : (
                <FiChevronsLeft />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {NavProps.pages &&
              NavProps.pages.map(function(page, i) {
                return (
                  <Fragment>
                    <DrawerItem
                      uri={page.path}
                      name={page.name}
                      icon={page.icon}
                      key={i}
                    />
                  </Fragment>
                );
              })}
          </List>
        </Drawer>
        <div className={classes.main}>
          <Switch>
            {NavProps.pages &&
              NavProps.pages.map(function(page, i) {
                return (
                  <Route
                    exact
                    path={page.path}
                    component={page.component}
                    key={i}
                  />
                );
              })}
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
}
