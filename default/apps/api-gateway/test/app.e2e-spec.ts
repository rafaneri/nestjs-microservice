import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ApiGatewayModule } from './../src/api-gateway.module';
import { EventType, TransactionType } from '@wallet/domain';

describe('ApiGatewayController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiGatewayModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async (done) => {
    await app.close();
    done();
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
