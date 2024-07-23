import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ApiGatewayModule } from './../src/api-gateway.module';
import { EventType, TransactionType } from '@wallet/domain';

describe('ApiGatewayController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const originalEnv = process.env;
    jest.resetModules();
    process.env = {
      ...originalEnv,
      MONGO_URL: 'mongodb://root:p1CP4!@localhost:27017/',
      RBMQ_URL: 'amqp://rabbitmq:5672',
      TCP_BALANCE_HOST: 'localhost',
      TCP_STATEMENT_HOST: 'localhost',
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiGatewayModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/wallet/:wallet/balance (GET)', () => {
    return request(app.getHttpServer()).get('/wallet/1/balance').expect(200);
  });

  it('/wallet/:wallet/statement (GET)', () => {
    return request(app.getHttpServer()).get('/wallet/1/statement').expect(200);
  });

  it('/wallet/:wallet/transact (POST)', () => {
    const payload = {
      type: TransactionType.CREDIT,
      event: EventType.DEPOSIT,
      amount: 20,
      timestamp: new Date().getTime(),
    };
    return request(app.getHttpServer())
      .post('/wallet/1/transact')
      .send(payload)
      .expect(201);
  });
});
