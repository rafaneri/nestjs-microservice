import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ApiGatewayModule } from './../src/api-gateway.module';

describe('ApiGatewayController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiGatewayModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/wallet/:wallet/balance (GET)', () => {
    return request(app.getHttpServer()).get('/wallet/1/balance').expect(200);
  });
});
