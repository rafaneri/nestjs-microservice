import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { GetBalanceModule } from './../src/get-balance.module';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ActionType } from '../../../libs/domain/src';

describe('GetBalanceController (e2e)', () => {
  let app: INestApplication;
  let client: ClientProxy;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        GetBalanceModule,
        ClientsModule.register([
          { name: 'GetBalance', transport: Transport.TCP },
        ]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.connectMicroservice({
      transport: Transport.TCP,
    });

    await app.startAllMicroservices();
    await app.init();

    client = app.get('GetBalance');
    await client.connect();
  });

  afterAll(async () => {
    await app.close();
    client.close();
  });

  it('test @MessagePattern(ActionType.GET_BALLANCE)', (done) => {
    const response: Observable<any> = client.send(ActionType.GET_BALLANCE, '1');

    response.subscribe((balance) => {
      expect(balance).toBe(1);
      done();
    });
  });
});
