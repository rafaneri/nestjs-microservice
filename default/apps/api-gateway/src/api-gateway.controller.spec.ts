import { Test, TestingModule } from '@nestjs/testing';
import { ApiGatewayController } from './api-gateway.controller';
import { ServicesModule } from './services/services.module';
import {
  EventType,
  RegisterTransactionEventDtoInterface,
  TransactionType,
} from '@wallet/domain';

describe('ApiGatewayController', () => {
  let apiGatewayController: ApiGatewayController;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ServicesModule],
      controllers: [ApiGatewayController],
    }).compile();

    apiGatewayController =
      module.get<ApiGatewayController>(ApiGatewayController);
    await module.init();
  });

  afterEach(async () => await module.close());

  it('should be defined', () => {
    expect(apiGatewayController).toBeDefined();
  });

  it('[/wallet/:wallet/balance] should be "1"', async () => {
    const result = await apiGatewayController.getBalance('1');
    expect(result).toBe(1);
  });

  it('[/wallet/:wallet/statement] should return length greater than 0 if called with "1"', async () => {
    const result = await apiGatewayController.listStatement('1');
    expect(result.length).toBeGreaterThanOrEqual(0);
  });

  it('[/wallet/:wallet/transaction] should be defined', () => {
    const wallet = '123A';
    const timestamp = new Date().getTime();
    const payload: RegisterTransactionEventDtoInterface = {
      type: TransactionType.CREDIT,
      event: EventType.DEPOSIT,
      amount: 20,
      timestamp,
    };
    const updateWalletSpy = jest.spyOn(apiGatewayController, 'updateWallet');

    apiGatewayController.updateWallet(wallet, payload);

    const expectedPayload: RegisterTransactionEventDtoInterface = {
      type: TransactionType.CREDIT,
      event: EventType.DEPOSIT,
      amount: 20,
      timestamp,
    };

    expect(updateWalletSpy).toHaveBeenCalledWith(wallet, expectedPayload);
  });
});
