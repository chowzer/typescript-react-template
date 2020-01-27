import mongoose from 'mongoose';

export async function isValidId(req, res, next) {
  let id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({ message: `${id} is not found` });
  }

  next();
}
