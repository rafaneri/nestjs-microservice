import { connect, connection } from 'mongoose';

beforeAll(async () => {
  connect(global.__MONGOD__.getUri(), { autoIndex: true, autoCreate: true });
});

afterAll(async () => {
  await connection.close();
});

export function generateRandomAccount(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
