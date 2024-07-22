import { Test, TestingModule } from '@nestjs/testing';
import { ListStatementService } from './list-statement.service';
import { ConfigModule } from '@nestjs/config';
import { ActionType } from '@wallet/domain';

describe('ListStatementService', () => {
  let service: ListStatementService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [ListStatementService],
    }).compile();

    service = module.get<ListStatementService>(ListStatementService);
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

    await service.listStatement(wallet);

    expect(mockSendMessage).toHaveBeenCalledWith(
      ActionType.LIST_STATEMENT,
      wallet,
    );
  });

  it('should throw an error if called with wrong parameters', () => {
    expect(async () => {
      await service.sendMessage('', 1);
    }).rejects.toThrow();
  });
});
