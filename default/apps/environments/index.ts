import * as dotenv from 'dotenv';
dotenv.config();

// mongodb
const MONGO_URL =
  process.env.MONGO_URL || `mongodb://root:p1CP4!@localhost:27017/`;
const MONGO_DATABASE = process.env.MONGO_DATABASE || `wallet`;

export { MONGO_URL, MONGO_DATABASE };
