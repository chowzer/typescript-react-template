import {
  getItem,
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
} from '../src/api/itemAPI';

import axios from 'axios';
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const uri = `/items`;

describe('item get route', () => {
  test('get single item', async () => {
    mockedAxios.get.mockResolvedValue({
      _id: '5e0ecdb2f6255d0d0b86e160',
      name: 'best item',
      price: 50,
      createdAt: '2020-01-03T05:14:26.654Z',
      __v: 0,
    });
    const item = await getItem(`5e0ecdb2f6255d0d0b86e160`);
    expect(item).toMatchObject(mockedItems[0]);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      uri + `/5e0ecdb2f6255d0d0b86e160`
    );
  }),
    test('get all items', async () => {
      mockedAxios.get.mockResolvedValue([
        {
          _id: '5e0ecdb2f6255d0d0b86e160',
          name: 'best item',
          price: 50,
          createdAt: '2020-01-03T05:14:26.654Z',
          __v: 0,
        },
        {
          _id: '5e0ecdb2f6255d0d0b86e1ab',
          name: 'best item 2',
          price: 100,
          createdAt: '2020-01-03T05:14:26.654Z',
          __v: 0,
        },
      ]);
      const item = await getAllItems();
      expect(item).toMatchObject(mockedItems);
      expect(mockedAxios.get).toHaveBeenCalledWith(uri);
    });
});

describe(`create item route`, () => {
  test(`create an item`, async () => {
    mockedAxios.post.mockReturnValue(
      Promise.resolve({
        _id: '5e0ecdb2f6255d0d0b86e1ab',
        name: 'createdItem',
        price: 100,
        createdAt: Date.now,
        __v: 0,
      })
    );
    const createdItem = await createItem(`createdItem`, 150);
    expect(createdItem).toMatchObject({
      _id: '5e0ecdb2f6255d0d0b86e1ab',
      name: 'createdItem',
      price: 100,
      createdAt: Date.now,
      __v: 0,
    });
    expect(mockedAxios.post).toHaveBeenCalledWith(uri, {
      name: 'createdItem',
      price: 150,
    });
  });
});

describe(`update item route`, () => {
  test(`update an item`, async () => {
    mockedAxios.patch.mockReturnValue(
      Promise.resolve({
        _id: '5e0e4495b8aa9da3cc4360fd',
        name: 'updated item',
        price: 52,
        createdAt: '2020-01-02T19:29:25.470Z',
        __v: 0,
      })
    );
    const updatedItem = await updateItem(
      `5e0e4495b8aa9da3cc4360fd`,
      'updated item',
      200
    );
    expect(updatedItem).toMatchObject({
      _id: '5e0e4495b8aa9da3cc4360fd',
      name: 'updated item',
      price: 52,
      createdAt: '2020-01-02T19:29:25.470Z',
      __v: 0,
    });
    expect(mockedAxios.patch).toHaveBeenCalledWith(
      uri + `/5e0e4495b8aa9da3cc4360fd`,
      {
        name: 'updated item',
        price: 200,
      }
    );
  });
  test(`update non existing item`, async () => {
    mockedAxios.patch.mockReturnValue(
      Promise.resolve({
        message: '5e0e4495b8aa9da3cc4360fd was not updated.',
      })
    );
    const updatedItem = await updateItem(
      `5e0e4495b8aa9da3cc4360fd`,
      'updated item',
      200
    );
    expect(400);
    expect(updatedItem).toMatchObject({
      message: '5e0e4495b8aa9da3cc4360fd was not updated.',
    });
  });
});

describe('delete item route', () => {
  test('delete an item', async () => {
    mockedAxios.delete.mockReturnValue(
      Promise.resolve({
        message: '5e0e4495b8aa9da3cc4360fd is deleted.',
      })
    );
    const deletedItem = await deleteItem('5e0e4495b8aa9da3cc4360fd');
    expect(deletedItem).toMatchObject({
      message: '5e0e4495b8aa9da3cc4360fd is deleted.',
    });
    expect(mockedAxios.delete).toHaveBeenCalledWith(
      uri + '/5e0e4495b8aa9da3cc4360fd'
    );
  });
});

const mockedItems = [
  {
    _id: '5e0ecdb2f6255d0d0b86e160',
    name: 'best item',
    price: 50,
    createdAt: '2020-01-03T05:14:26.654Z',
    __v: 0,
  },
  {
    _id: '5e0ecdb2f6255d0d0b86e1ab',
    name: 'best item 2',
    price: 100,
    createdAt: '2020-01-03T05:14:26.654Z',
    __v: 0,
  },
];
