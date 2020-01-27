import { Fragment } from 'react';
import React from 'react';
import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  Paper,
  CardActions,
  IconButton,
  makeStyles,
  createStyles,
  Grid,
} from '@material-ui/core';
import Styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';
import { MdShare, MdAddShoppingCart } from 'react-icons/md';
import clsx from 'clsx';
import { addFavorite, removeFavorite } from '../../api/userAPI';
import { Item } from '../../models/items';

interface ItemProp {
  Item: Item;
}

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      width: '280px',
    },
    actionGrid: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-start',
    },
    shareIcon: {
      color: '#24a0ed',
      flex: '1',
    },
    faved: {
      color: '#ff0000',
    },
    unfaved: {
      color: 'rbga(0,0,0,0.5)',
    },
  })
);

export default function ItemCard(prop: ItemProp) {
  const itemProp = prop.Item;
  const classes = useStyles();
  const [like, setLike] = React.useState(false);
  const toggleLike = () => {
    setLike(!like);
    if (like) {
      removeFavorite(itemProp.name);
    } else {
      addFavorite(itemProp.name);
    }
  };

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <Card>
          <CardHeader title={itemProp.name}></CardHeader>
          <CardContent>
            <Typography>{itemProp.description}</Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Grid className={classes.actionGrid}>
              <IconButton aria-label="fav!">
                <FaHeart
                  onClick={toggleLike}
                  className={clsx({
                    [classes.faved]: like,
                    [classes.unfaved]: !like,
                  })}
                />
              </IconButton>
              <IconButton aria-label="share!">
                <MdShare className={classes.shareIcon} />
              </IconButton>
              <IconButton aria-label="cart">
                <MdAddShoppingCart />
              </IconButton>
            </Grid>
          </CardActions>
        </Card>
      </Paper>
    </Fragment>
  );
}
