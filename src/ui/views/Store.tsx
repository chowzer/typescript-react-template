import React, { Component, Fragment } from 'react';
import { getAllItems } from '../../api/itemAPI';
import ItemCard from '../components/ItemCard';
import { Grid } from '@material-ui/core';
interface StoreState {
  itemList: any[];
}

export default class Store extends Component<{}, StoreState, any> {
  constructor(props) {
    super(props);
    this.state = { itemList: [] };
  }

  async componentDidMount(): Promise<void> {
    const res = await getAllItems();
    this.setState({ itemList: res.data });
  }

  render() {
    const items = this.state.itemList;
    return (
      <div flex-grow={1}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1> Items</h1>
          </Grid>
          {items &&
            items.map(function(it, i) {
              return (
                <Grid item xs={12} md={6} lg={3} xl={2}>
                  <ItemCard key={i} Item={it} />
                </Grid>
              );
            })}
        </Grid>
      </div>
    );
  }
}
