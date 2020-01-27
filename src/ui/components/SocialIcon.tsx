import React from 'react';
import { IconButton, createStyles, makeStyles } from '@material-ui/core';
import { IconType } from 'react-icons/lib/cjs';
import Icon from './Icon';

interface IconProp {
  className?: string;
  menuIcon: IconType;
  fontSize: number;
  path: string;
}

const useStyle = makeStyles(() =>
  createStyles({
    icon: {
      textAlign: 'center',
    },
  })
);

function SocialIcon(prop: IconProp) {
  const classes = useStyle();
  return (
    <IconButton
      onClick={() => {
        window.open(prop.path, '_blank');
      }}>
      <Icon
        className={[classes.icon, prop.className].join(' ')}
        icon={prop.menuIcon}
        fontSize={prop.fontSize}
      />
    </IconButton>
  );
}

export default SocialIcon;
