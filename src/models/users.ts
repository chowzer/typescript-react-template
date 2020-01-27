import { Schema, Document, Model, model } from 'mongoose';
import { Item } from './items';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  favorites: Item[];
  createdAt: Date;
  modifiedAt: Date;
}

export interface UserModel extends IUser, Document {}

export class User implements IUser {
  firstName: string;
  lastName: string;
  readonly email: string;
  favorites: Item[];
  readonly createdAt: Date;
  readonly modifiedAt: Date;

  constructor(model: UserModel) {
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.email = model.email;
    this.favorites = model.favorites;
    this.createdAt = model.createdAt;
    this.modifiedAt = model.modifiedAt;
  }

  getFullName = (): string => {
    return `${this.firstName} ${this.lastName}`;
  };
}

export const schema: Schema = new Schema({
  createdAt: {
    type: Date,
  },
  modifiedAt: {
    type: Date,
  },
  email: {
    type: String,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  favorites: {
    type: [],
    required: true,
  },
});
schema.pre<UserModel>('save', function(next) {
  UserSchema.find({ email: this.email }, (err, docs) => {
    if (!docs.length) {
      if (!this.email) {
        next(new Error(`email is required`));
      }
      let now = new Date();
      if (!this.createdAt) {
        this.createdAt = now;
        this.modifiedAt = now;
      }
      if (!this.favorites) {
        this.favorites = [];
      }
      next();
    } else {
      console.log('user was not created');
      next(new Error('User was not created'));
    }
  });
});
schema.pre<UserModel>('findOneAndUpdate', function(next) {
  let now = new Date();
  this.update({}, { modifiedAt: now });
  next();
});
schema.path('email').validate((email: string) => {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}, 'the email is invalid.');

export const UserSchema: Model<UserModel> = model<UserModel>('User', schema);
