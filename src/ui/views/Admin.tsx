import React, { Fragment } from 'react';
import { FaInfo, FaShoppingCart } from 'react-icons/fa';
import DrawerNavigation from '../components/DrawerNavigation';
import About from '../views/About';
import Store from '../views/Store';

export const AdminPage = () => {
  let adminProp = {
    title: 'Vacation Days',
    pages: [
      {
        path: '/admin/about',
        name: 'about',
        component: About,
        icon: FaInfo,
      },
      {
        path: '/admin/store',
        name: 'store',
        component: Store,
        icon: FaShoppingCart,
      },
    ],
  };

  return (
    <Fragment>
      <DrawerNavigation
        title={adminProp.title}
        pages={adminProp.pages}></DrawerNavigation>
    </Fragment>
  );
};
