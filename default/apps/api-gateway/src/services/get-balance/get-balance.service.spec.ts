import { Test, TestingModule } from '@nestjs/testing';
import { GetBalanceService } from './get-balance.service';
import { ConfigModule } from '@nestjs/config';
import { ActionType } from '@wallet/domain';

describe('GetBalanceService', () => {
  let service: GetBalanceService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [GetBalanceService],
    }).compile();

    service = module.get<GetBalanceService>(GetBalanceService);
    await module.init();
  });

  afterEach(async () => await module.close());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have been called sendMessage', async () => {
    const wallet = 'validWalletId';
    const mockSendMessage = jest.fn();
    service.sendMessage = mockSendMessage;

    await service.getBalance(wallet);

    expect(mockSendMessage).toHaveBeenCalledWith(
      ActionType.GET_BALANCE,
      wallet,
    );
  });

  it('should throw an error if called with wrong parameters', () => {
    expect(async () => {
      await service.sendMessage('', 1);
    }).rejects.toThrow();
  });
});
