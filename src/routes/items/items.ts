import express from 'express';
import mongoose from 'mongoose';
import { check } from 'express-validator';
import { isValidId } from '../routeMiddleware';
import { ItemSchema, ItemModel } from '../../models/items';

const itemRouter = express.Router();

// GET
itemRouter.get('/', async (req, res) => {
  try {
    const item = await ItemSchema.find();
    return res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ONE
itemRouter.get('/:id', getItem, (req, res) => {
  res.status(200).json(res.locals.item);
});

// CREATE one
itemRouter.post(
  '/',
  [
    check('name')
      .not()
      .isEmpty()
      .withMessage('name is required'),
    check('price')
      .not()
      .isEmpty()
      .withMessage('price cannot be empty'),
  ],
  async (req, res) => {
    const item = new ItemSchema({
      name: req.body.name,
      price: req.body.price,
    });

    try {
      const newItem = await item.save();
      return res.status(201).json(newItem);
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
);

// PATCH one
itemRouter.patch(
  '/:id',
  [
    check('name')
      .not()
      .isEmpty()
      .withMessage('name is required'),
    check('price')
      .not()
      .isEmpty()
      .withMessage('price cannot be empty'),
  ],
  isValidId,
  async (req, res) => {
    let id = req.params.id;
    try {
      await ItemSchema.findOneAndUpdate(
        { _id: id },
        req.body,
        { new: true },
        (err, doc) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send({ message: err.message });
          }
          if (doc) {
            return res.status(200).send(doc);
          } else {
            return res.status(400).send({
              message: `${id} was not updated.`,
            });
          }
        }
      );
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  }
);

// DELETE one
itemRouter.delete('/:id', isValidId, async (req, res) => {
  let id = req.params.id;

  try {
    await ItemSchema.findOneAndDelete(id);
    res.status(200).send({ message: `${id} is deleted.` });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// middleware
async function getItem(req, res, next) {
  var item: ItemModel | null = null;
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log(`${req.params.id} is an invalid ItemId`);
      return res.status(404).json({ message: 'Cannot find Item' });
    }
    item = await ItemSchema.findById(req.params.id);

    if (item == null) {
      return res.status(404).json({ message: 'Cannot find Item' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.locals.item = item;
  next();
}

export = itemRouter;
