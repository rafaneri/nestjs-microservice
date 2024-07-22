import { connect, connection, set } from 'mongoose';

set('strictQuery', false);
connect(process.env.MONGO_URL, {
  dbName: process.env.MONGO_DATABASE,
  autoIndex: true,
  autoCreate: true,
});

const db = connection;
db.on('error', console.error.bind(console, 'connection error:'));

export const isConnected = new Promise((resolve) => db.once('open', resolve));
