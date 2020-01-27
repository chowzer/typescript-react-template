import React, { ReactNode } from 'react';
import {
  makeStyles,
  createStyles,
  Typography,
  Theme,
  useTheme,
} from '@material-ui/core';
import SocialIcon from './SocialIcon';
import { IconType } from 'react-icons/lib/cjs';

interface FooterProp {
  className?: string;
  tagLine?: string;
  phoneNumber?: string;
  email?: string;
  children?: ReactNode;
  copyright?: string;
  icon?: {
    icon: IconType;
    fontSize: number;
    path: string;
  }[];
}

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      alignItems: 'center',
      textAlign: 'center',
      padding: '32px 0 32px 0',
      marginTop: 32,
      bottom: 0,
      left: 0,
      background: theme.palette.primary.dark,
    },
    typography: {
      color: theme.palette.secondary.light,
      fontWeight: theme.typography.fontWeightLight,
    },
    strongTypo: {
      color: theme.palette.secondary.dark,
      fontWeight: theme.typography.fontWeightMedium,
    },
    copyRightTypo: {
      color: theme.palette.secondary.light,
      fontWeight: theme.typography.fontWeightLight,
      padding: 35,
    },
    socialBox: {
      display: 'flex',
      letterSpacing: theme.spacing(2),
      justifyContent: 'center',
    },
    iconTypography: {
      flexDirection: 'row',
      color: '#ffffff',
    },
  })
);

export default function Footer(prop: FooterProp) {
  const classes = useStyle();

  return (
    <div className={prop.className}>
      <footer className={classes.root}>
        <Typography className={classes.typography} variant={'h6'}>
          {prop.tagLine}
        </Typography>
        <Typography className={classes.typography} variant={'h6'}>
          Contact Info:
        </Typography>
        <Typography className={classes.typography} variant={'h6'}>
          {prop.phoneNumber}
        </Typography>
        <Typography className={classes.typography} variant={'h6'}>
          {prop.email}
        </Typography>

        <div className={classes.socialBox}>
          {prop.icon &&
            prop.icon.map(function(icon, i) {
              return (
                <SocialIcon
                  className={classes.iconTypography}
                  menuIcon={icon.icon}
                  path={icon.path}
                  fontSize={icon.fontSize}
                  key={i}
                />
              );
            })}
        </div>

        <hr></hr>

        <Typography className={classes.copyRightTypo} variant={'h5'}>
          &copy;{' '}
          {prop.copyright ? prop.copyright : 'Powered By the Coding Vagabond'}{' '}
        </Typography>
      </footer>
    </div>
  );
}
