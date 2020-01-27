import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { IconType } from 'react-icons/lib/cjs';
import Icon from './Icon';

interface ItemProp {
  uri: string;
  name: string;
  icon: IconType;
}

export default function DrawerItem(ItemProp: ItemProp) {
  return (
    <Fragment>
      <Link to={`${ItemProp.uri}`}>
        <ListItem>
          <ListItemIcon>
            <Icon icon={ItemProp.icon} fontSize={25}></Icon>
          </ListItemIcon>
          <ListItemText>
            <Typography>{ItemProp.name}</Typography>
          </ListItemText>
          {/* <ListItemText primary={ItemProp.name} /> */}
        </ListItem>
        {/* <Typography>{ItemProp.name}</Typography> */}
      </Link>
    </Fragment>
  );
}
