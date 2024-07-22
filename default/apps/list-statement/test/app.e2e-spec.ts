import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ListStatementModule } from './../src/list-statement.module';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { ActionType, TransactionInterface } from '@wallet/domain';

describe('ListStatementController (e2e)', () => {
  let app: INestApplication;
  let client: ClientProxy;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ListStatementModule,
        ClientsModule.register([
          { name: 'ListStatement', transport: Transport.TCP },
        ]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.connectMicroservice({
      transport: Transport.TCP,
    });

    await app.startAllMicroservices();
    await app.init();

    client = app.get('ListStatement');
    await client.connect();
  });

  afterAll(async () => {
    await app.close();
    client.close();
  });

  it('test @MessagePattern(ActionType.LIST_STATEMENT)', (done) => {
    const response = client.send<TransactionInterface[], string>(
      ActionType.LIST_STATEMENT,
      '1',
    );

    response.subscribe((list) => {
      expect(list.length).toBeGreaterThanOrEqual(0);
      done();
    });
  });
});
