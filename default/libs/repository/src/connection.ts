import { connect, connection, set } from 'mongoose';
import { MONGO_URL, MONGO_DATABASE } from '../../../apps/environments';

set('strictQuery', false);

connect(MONGO_URL, {
  dbName: MONGO_DATABASE,
  autoIndex: true,
  autoCreate: true,
});

const db = connection;
db.on('error', console.error.bind(console, 'connection error:'));

export const isConnected = new Promise((resolve) => db.once('open', resolve));
