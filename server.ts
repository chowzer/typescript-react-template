import express from 'express';
import mongoose from 'mongoose';
import history from 'connect-history-api-fallback';
import userRouter from './src/routes/users/users';
import itemRouter from './src/routes/items/items';
import { AdminPage } from './src/ui/views/Admin';
require('dotenv').config();

const port = process.env.PORT || 8000;
const app = express();
app.use(history()); //prevents the CANNOT GET/ issue on refresh
app.use(express.static(__dirname + '/dist'));

let db_url =
  process.env.DATABASE_URL !== undefined ? process.env.DATABASE_URL : '';

if (db_url != '') {
  mongoose.connect(db_url, { useNewUrlParser: true, useFindAndModify: false });
} else {
  console.error('DB URL is empty');
}

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

app.use('/users', userRouter);
app.use('/items', itemRouter);

app.listen(port, function() {
  console.log('listening on port: ', port);
});
