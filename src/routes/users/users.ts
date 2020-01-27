import express from 'express';
import { UserSchema, UserModel } from '../../models/users';
import { isValidId } from '../routeMiddleware';
import { check } from 'express-validator';
import mongoose from 'mongoose';
const userRouter = express.Router();

//Get all
userRouter.get('/', async (req, res) => {
  try {
    const users = await UserSchema.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get one
userRouter.get('/:id', getUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

//Creating one
userRouter.post(
  '/',
  [
    check('firstName')
      .notEmpty()
      .withMessage('name cannot be empty'),
    check('lastName')
      .notEmpty()
      .withMessage('name cannot be empty'),
    check('email')
      .isEmail()
      .withMessage('email cannot be empty'),
  ],
  async (req, res) => {
    const user = new UserSchema({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });

    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
);

//Updating one
userRouter.patch('/:id', isValidId, async (req, res) => {
  let id = req.params.id;
  if (req.body.email) {
    console.error(`email cannot be updated`);
  }
  delete req.body.email;

  try {
    await UserSchema.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true },
      (err, doc) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send({ message: err.message });
        }
        return res.status(200).send(doc);
      }
    );
  } catch (err) {
    console.log(`in users/users error`);
    return res.status(400).send({ message: err.message });
  }
});

// Deleting one
userRouter.delete('/:id', isValidId, async (req, res) => {
  let id = req.params.id;

  try {
    await UserSchema.findOneAndDelete(id);
    res.status(200).send({ message: `${id} is deleted.` });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// Middleware

async function getUser(req, res, next) {
  var user: UserModel | null = null;
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log(`${req.params.id} is an invalid UserId`);
      return res.status(404).json({ message: 'Cannot find User' });
    }
    user = await UserSchema.findById(req.params.id);

    if (user == null) {
      return res.status(404).json({ message: 'Cannot find User' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.locals.user = user;
  next();
}

export = userRouter;
