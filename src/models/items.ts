import { Schema, Document, Model, model } from 'mongoose';

interface IItem {
  name: string;
  price: number;
  description: string;
  createdAt: Date;
  modifiedAt: Date;
}

export interface ItemModel extends IItem, Document {}

export class Item implements IItem {
  name: string = '';
  price: number;
  description: string = '';
  readonly createdAt: Date;
  readonly modifiedAt: Date;

  constructor(model: ItemModel) {
    this.createdAt = model.createdAt;
    this.modifiedAt = model.modifiedAt;
    this.name = model.name;
    this.price = model.price;
    this.description = model.description;
  }
}

export const schema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  modifiedAt: {
    type: Date,
  },
});

schema.pre<ItemModel>('save', function(next) {
  let now = new Date();
  if (!this.createdAt) {
    this.modifiedAt = now;
    this.createdAt = now;
  }

  if (!this.price) {
    this.price = 0;
  }
  next();
});

schema.pre<ItemModel>('findOneAndUpdate', function(next) {
  let now = new Date();
  this.update({}, { modifiedAt: now });
  next();
});

export const ItemSchema: Model<ItemModel> = model<ItemModel>('Item', schema);
