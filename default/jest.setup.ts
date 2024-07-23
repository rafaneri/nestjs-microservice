import { connect, connection } from 'mongoose';

beforeAll(async () => {
  connect(global.__MONGOD__.getUri(), { autoIndex: true, autoCreate: true });
});

afterAll(async () => {
  await connection?.close();
});
