import {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../src/api/userAPI';

import axios from 'axios';
import { userInfo } from 'os';
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const uri = `/users`;

describe('user get route', () => {
  test('get single user', async () => {
    mockedAxios.get.mockResolvedValue({
      _id: '5e1221ce94a8ed4171f14eed',
      firstName: 'amazing',
      lastName: 'name',
      email: 'amazing@codingvagabond.com',
      createdAt: '2020-01-05T17:50:06.217Z',
      modifiedAt: '2020-01-06T04:42:10.543Z',
      __v: 0,
    });
    const user = await getUser('5e1221ce94a8ed4171f14eed');
    expect(user).toMatchObject(mockedUsers[0]);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      uri + `/5e1221ce94a8ed4171f14eed`
    );
  });
  test('get all users', async () => {
    mockedAxios.get.mockResolvedValue([
      {
        _id: '5e1221ce94a8ed4171f14eed',
        firstName: 'amazing',
        lastName: 'name',
        email: 'amazing@codingvagabond.com',
        createdAt: '2020-01-05T17:50:06.217Z',
        modifiedAt: '2020-01-06T04:42:10.543Z',
        __v: 0,
      },
      {
        _id: '5e1222a0fe21c341e923a248',
        firstName: 'second',
        lastName: 'user',
        email: 'second@codingvagabond.com',
        createdAt: '2020-01-05T17:53:36.551Z',
        modifiedAt: '2020-01-06T04:42:10.543Z',
        __v: 0,
      },
    ]);
    const users = await getAllUsers();
    expect(users).toMatchObject(mockedUsers);
    expect(mockedAxios.get).toHaveBeenCalledWith(uri);
  });
});

describe('create user route', () => {
  test('create one user', async () => {
    mockedAxios.post.mockResolvedValue(
      Promise.resolve({
        _id: '5e1221ce94a8ed4171f14eed',
        firstName: 'amazing',
        lastName: 'name',
        email: 'amazing@codingvagabond.com',
        createdAt: '2020-01-05T17:50:06.217Z',
        modifiedAt: '2020-01-06T04:42:10.543Z',
        __v: 0,
      })
    );
    const createdUser = await createUser(
      'amazing',
      'name',
      `amazing@codingvagabond.com`
    );
    expect(201);
    expect(createdUser).toMatchObject(mockedUsers[0]);
    expect(mockedAxios.post).toHaveBeenCalledWith(uri, {
      firstName: 'amazing',
      lastName: 'name',
      email: 'amazing@codingvagabond.com',
    });
  });
  test('create existing user', async () => {
    mockedAxios.post.mockReturnValue(
      Promise.resolve({
        message: 'User was not created',
      })
    );
    const createdUser = await createUser(
      'amazing',
      'name',
      `amazing@codingvagabond.com`
    );
    expect(400);
    expect(createdUser).toMatchObject({
      message: 'User was not created',
    });
  });
  test('create user with only matching email', async () => {
    mockedAxios.post.mockReturnValue(
      Promise.resolve({
        message: 'User was not created',
      })
    );
    const createdUser = await createUser(
      'othername',
      'zebra',
      `amazing@codingvagabond.com`
    );
    expect(400);
    expect(createdUser).toMatchObject({
      message: 'User was not created',
    });
  });
  test('create user without email', async () => {
    mockedAxios.post.mockReturnValue(
      Promise.resolve({
        message: 'User validation failed: email: Path `email` is required.',
      })
    );
    const createdUser = await createUser('othername', 'zebra', ``);
    expect(400);
    expect(createdUser).toMatchObject({
      message: 'User validation failed: email: Path `email` is required.',
    });
  });
  test('create user with invalid email', async () => {
    mockedAxios.post.mockReturnValue(
      Promise.resolve({
        message: 'User validation failed: email: the email is invalid.',
      })
    );
    const createdUser = await createUser('amazing', 'name', '@.com');
    expect(400);
    expect(createdUser).toMatchObject({
      message: 'User validation failed: email: the email is invalid.',
    });
  });
  test('email with whitespace is trimmed', async () => {
    mockedAxios.post.mockReturnValue(
      Promise.resolve({
        _id: '5e12b77be1b9984a50e8b8af',
        firstName: 'amazing',
        lastName: 'user',
        email: 'amazing@user.com',
        createdAt: '2020-01-06T04:28:43.400Z',
        modifiedAt: '2020-01-06T04:28:43.400Z',
        __v: 0,
      })
    );
    const createdUser = await createUser(
      'amazing',
      'user',
      `amazing@user.com   `
    );
    expect(201);
    expect(createdUser).toMatchObject({
      _id: '5e12b77be1b9984a50e8b8af',
      firstName: 'amazing',
      lastName: 'user',
      email: 'amazing@user.com',
      createdAt: '2020-01-06T04:28:43.400Z',
      modifiedAt: '2020-01-06T04:28:43.400Z',
      __v: 0,
    });
  });
});

describe('update user route', () => {
  test(`update one user`, async () => {
    mockedAxios.patch.mockReturnValue(
      Promise.resolve({
        _id: '5e12b70de1b9984a50e8b8ae',
        firstName: 'amazing 2',
        lastName: 'name 2',
        email: 'second@user.ca',
        createdAt: '2020-01-06T04:26:53.081Z',
        modifiedAt: '2020-01-06T04:46:40.725Z',
        __v: 0,
      })
    );
    const updatedUser = await updateUser(
      '5e12b70de1b9984a50e8b8ae',
      'amazing 2',
      'name 2'
    );
    console.log(updatedUser);
    expect(200);
    expect(updatedUser).toMatchObject({
      _id: '5e12b70de1b9984a50e8b8ae',
      firstName: 'amazing 2',
      lastName: 'name 2',
      email: 'second@user.ca',
      createdAt: '2020-01-06T04:26:53.081Z',
      modifiedAt: '2020-01-06T04:46:40.725Z',
      __v: 0,
    });
  });
  test('failed update to user', async () => {});
});

describe('update a user', () => {
  test('can update user', async () => {
    mockedAxios.patch.mockResolvedValue({
      _id: '5e1221ce94a8ed4171f14eed',
      firstName: 'updated first name',
      lastName: 'updated last name',
      email: 'amazing@codingvagabond.com',
      createdAt: '2020-01-05T17:50:06.217Z',
      modifiedAt: '2020-01-06T04:42:10.543Z',
      __v: 0,
    });
    const updatedUser = await updateUser(
      '5e1221ce94a8ed4171f14eed',
      'updated first name',
      'updated last name'
    );
    expect(200);
    expect(updatedUser).toMatchObject({
      _id: '5e1221ce94a8ed4171f14eed',
      firstName: 'updated first name',
      lastName: 'updated last name',
      email: 'amazing@codingvagabond.com',
      createdAt: '2020-01-05T17:50:06.217Z',
      modifiedAt: '2020-01-06T04:42:10.543Z',
      __v: 0,
    });
  });

  test('cannot update non existing user', async () => {
    mockedAxios.patch.mockReturnValue(
      Promise.resolve({
        message: '5e1221ce94a8ed4171f14aac is not found',
      })
    );
    const updatedUser = await updateUser(
      '5e1221ce94a8ed4171f14aac',
      'cannot',
      'update'
    );
    expect(404);
    expect(updatedUser).toMatchObject({
      message: '5e1221ce94a8ed4171f14aac is not found',
    });
  });
});
const mockedUsers = [
  {
    _id: '5e1221ce94a8ed4171f14eed',
    firstName: 'amazing',
    lastName: 'name',
    email: 'amazing@codingvagabond.com',
    createdAt: '2020-01-05T17:50:06.217Z',
    modifiedAt: '2020-01-06T04:42:10.543Z',
    __v: 0,
  },
  {
    _id: '5e1222a0fe21c341e923a248',
    firstName: 'second',
    lastName: 'user',
    email: 'second@codingvagabond.com',
    createdAt: '2020-01-05T17:53:36.551Z',
    modifiedAt: '2020-01-06T04:42:10.543Z',
    __v: 0,
  },
];
