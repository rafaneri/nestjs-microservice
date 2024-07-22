import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UpdateBalanceModule } from './../src/update-balance.module';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import {
  ActionType,
  EventType,
  TransactionEventDto,
  TransactionType,
} from '@wallet/domain';

describe('UpdateBalanceController (e2e)', () => {
  let app: INestApplication;
  let client: ClientProxy;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UpdateBalanceModule,
        ClientsModule.register([
          {
            name: 'UpdateBalance',
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://localhost:5672`],
              queue: `balance`,
              queueOptions: {
                durable: false,
              },
            },
          },
        ]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://localhost:5672`],
        queue: `balance`,
        queueOptions: {
          durable: false,
        },
      },
    });

    await app.startAllMicroservices();
    await app.init();

    client = app.get('UpdateBalance');
    await client.connect();
  });

  afterAll(async () => {
    await app.close();
    client.close();
  });

  it('test @EventPattern(ActionType.UPDATE_BALLANCE)', () => {
    const response = client.send<void, TransactionEventDto>(
      ActionType.UPDATE_BALANCE,
      {
        type: TransactionType.CREDIT,
        event: EventType.DEPOSIT,
        wallet: '123',
        amount: 20,
        timestamp: new Date().getTime(),
      },
    );

    expect(response).toBeDefined();
  });
});
