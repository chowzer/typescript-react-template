import React, { ReactElement, Fragment } from 'react';
import TitleBanner from '../components/TitleBanner';
import Jumbotron from '../components/Jumbotron';
import CssGrid from '../components/CssGrid';
import ImageBlock from '../components/ImageBlock';
import StyledButton from '../components/StyledButton';
import { Typography, makeStyles, createStyles } from '@material-ui/core';
import FixedBackground from '../components/FixedBackground';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
    },
    titleBanner: {
      width: '100%',
    },
    flexBox: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

const backgroundImg = `https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1440&q=80`;

function mainBtnAction(): void {
  window.open(
    `https://www.youtube.com/c/tiaandandy?sub_confirmation=1`,
    '_blank'
  );
}

const text = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum, sit iure! Soluta numquam nihil, corporis eligendi nam, earum ut praesentium modi impedit dolores inventore aspernatur sit voluptas illum velit officiis.`;
const gear = `https://images.unsplash.com/photo-1431068799455-80bae0caf685?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&ixid=eyJhcHBfaWQiOjF9`;

function Home(): ReactElement {
  const classes = useStyles();

  return (
    <Fragment>
      <TitleBanner
        className={classes.titleBanner}
        title={'Tia & Andy'}
        tagLine={'Vacation Days'}
        backgroundUrl={backgroundImg}
        buttonText={'subscribe on youtube'}
        onClick={mainBtnAction}
      />

      <Jumbotron>
        <CssGrid columns={2}>
          <ImageBlock backgroundUrl={gear} title="Lorem" paragraph={text}>
            <StyledButton
              onClick={() => {
                alert(`i'm  a button`);
              }}>
              <Typography> I'm a button! </Typography>
            </StyledButton>
          </ImageBlock>
        </CssGrid>
      </Jumbotron>

      <FixedBackground
        backgroundUrl={backgroundImg}
        style={{ width: '100%' }}></FixedBackground>
    </Fragment>
  );
}
export default Home;
