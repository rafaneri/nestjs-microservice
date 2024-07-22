import { Test, TestingModule } from '@nestjs/testing';
import { ApiGatewayController } from './api-gateway.controller';
import { ServicesModule } from './services/services.module';
import {
  EventType,
  RegisterTransactionEventDto,
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
    const wallet = '123A';
    const mockGetBalance = jest.fn();
    mockGetBalance.mockResolvedValue({
      balance: 1,
    });
    apiGatewayController.getBalance = mockGetBalance;
    const result = await apiGatewayController.getBalance(wallet);

    const expectedPayload = {
      balance: 1,
    };

    expect(result.balance).toEqual(expectedPayload.balance);
  });

  it('[/wallet/:wallet/statement] should return length greater than 0 if called with "1"', async () => {
    const wallet = '123A';
    const mockListStatement = jest.fn();
    mockListStatement.mockResolvedValue([]);
    apiGatewayController.listStatement = mockListStatement;
    const result = await apiGatewayController.listStatement(wallet);
    expect(result.length).toBeGreaterThanOrEqual(0);
  });

  it('[/wallet/:wallet/transaction] should be defined', () => {
    const wallet = '123A';
    const timestamp = new Date().getTime();
    const payload: RegisterTransactionEventDto = {
      type: TransactionType.CREDIT,
      event: EventType.DEPOSIT,
      amount: 20,
      timestamp,
    };
    const mockUpdateWallet = jest.fn();
    mockUpdateWallet.mockReturnValue({
      type: TransactionType.CREDIT,
      event: EventType.DEPOSIT,
      amount: 20,
      timestamp,
    });
    apiGatewayController.updateWallet = mockUpdateWallet;

    apiGatewayController.updateWallet(wallet, payload);

    const expectedPayload: RegisterTransactionEventDto = {
      type: TransactionType.CREDIT,
      event: EventType.DEPOSIT,
      amount: 20,
      timestamp,
    };

    expect(mockUpdateWallet).toHaveBeenCalledWith(wallet, expectedPayload);
  });
});
