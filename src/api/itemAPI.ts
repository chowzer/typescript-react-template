import axios from 'axios';
import { ItemModel } from '../models/items';

const uri = '/items';

export async function getItem(id: string) {
  return await axios.get(`${uri}/${id}`);
}

export async function getAllItems() {
  return await axios.get(uri);
}

export async function createItem(itemName: string, itemPrice: number) {
  const item = {
    name: itemName,
    price: itemPrice,
  };

  return await axios.post(uri, item);
}

export async function updateItem(id: string, itemModel: ItemModel) {
  const item = {
    name: itemModel.name,
    price: itemModel.price,
    description: itemModel.description,
  };

  return await axios.patch(`${uri}/${id}`, item);
}

export async function deleteItem(id: string) {
  return await axios.delete(`${uri}/${id}`);
}
