import axios from 'axios';

const uri = '/users';

export async function getUser(id: string) {
  return await axios.get(`${uri}/${id}`);
}

export async function getAllUsers() {
  return await axios.get(uri);
}

export async function createUser(
  firstName: string,
  lastName: string,
  email: string
) {
  const user = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  return await axios.post(uri, user);
}

export async function updateUser(
  id: string,
  firstName: string,
  lastName: string
) {
  const user = {
    firstName: firstName,
    lastName: lastName,
  };

  return await axios.patch(`${uri}/${id}`, user);
}

export async function addFavorite(itemId: string) {
  console.log(`adding ${itemId}`);
}
export async function removeFavorite(itemId: string) {
  console.log(`removing ${itemId}`);
}

export async function deleteUser(id: string) {
  return await axios.delete(`${uri}/${id}`);
}
