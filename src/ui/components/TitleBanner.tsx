import {
  createStyles,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import React, { Component, Fragment } from 'react';
import StyledButton from './StyledButton';
import StaticBackground from './StaticBackground';

interface BannerProp extends WithStyles<typeof useStyle> {
  className?: string;
  title: string;
  tagLine: string | '';
  buttonText: string;
  backgroundUrl: string;
  onClick?: () => void;
}

const useStyle = () =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    caption: {
      textAlign: 'center',
      width: '100%',
      maxWidth: '100%',
      top: '38%',
      zIndex: 1,
      color: '#ffffff',
      textTransform: 'uppercase',
      position: 'absolute',
    },
    img: {
      objectFit: 'cover',
      width: '100%',
      height: '100vh',
    },
    titleText: {
      fontSize: '61px',
      letterSpacing: '4.8px',
      textShadow: '1.6px 1.6px 1.6px #000000',
      paddingBottom: '16px',
    },
    tagLine: {
      fontSize: '32px',
      textShadow: '1.6px 1.6px 1.6px #000000',
      paddingBottom: '25.6px',
    },
    buttonStyle: {
      textTransform: 'uppercase',
    },
    btnTypography: {
      color: '#ffffff',
      fontWeight: 400,
    },
  });

class TitleBanner extends Component<BannerProp> {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={this.props.className}>
          <StaticBackground>
            <img className={classes.img} src={this.props.backgroundUrl} />;
          </StaticBackground>
          <div className={classes.caption}>
            <Typography className={classes.tagLine} variant={'h3'}>
              {' '}
              {this.props.tagLine}
            </Typography>
            <Typography className={classes.titleText} variant={'h1'}>
              {' '}
              {this.props.title}
            </Typography>
            <StyledButton
              className={classes.buttonStyle}
              variant="contained"
              onClick={this.props.onClick}>
              <Typography variant={'h6'} className={classes.btnTypography}>
                {this.props.buttonText}
              </Typography>
            </StyledButton>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(useStyle)(TitleBanner);
