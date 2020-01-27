import { createStyles, makeStyles } from '@material-ui/core';
import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import {
  FaInstagram,
  FaPatreon,
  FaTwitterSquare,
  FaYoutube,
} from 'react-icons/fa';
import Appbar from '../components/Appbar';
import Footer from '../components/Footer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Gear from './Gear';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
    },
  })
);

const socials = [
  {
    icon: FaYoutube,
    path: 'https://youtube.com/c/tiaandandy',
    fontSize: 55,
  },
  {
    icon: FaTwitterSquare,
    path: 'https://twitter.com/tavacationdays',
    fontSize: 55,
  },
  {
    icon: FaInstagram,
    path: 'https://www.instagram.com/tiaandyvacationdays/',
    fontSize: 55,
  },
  {
    icon: FaPatreon,
    path: 'https://www.patreon.com/tiaandandy',
    fontSize: 55,
  },
];

export default function Front() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Appbar
        menuIcon={{ icon: AiFillHome, fontSize: 25 }}
        pageName="VACATION DAYS"
      />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/gear" component={Gear} />
      </Switch>
      <Footer
        tagLine={`Your Modern Age Vagabonds`}
        phoneNumber={`(888) 888 8888`}
        email={`email@email.com`}
        copyright={`Vacation Days`}
        icon={socials}
      />
    </div>
  );
}
