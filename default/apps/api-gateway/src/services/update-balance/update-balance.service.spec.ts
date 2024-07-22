import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBalanceService } from './update-balance.service';
import { ConfigModule } from '@nestjs/config';
import {
  ActionType,
  EventType,
  RegisterTransactionEventDto,
  TransactionEventDto,
  TransactionType,
} from '@wallet/domain';

describe('UpdateBalanceService', () => {
  let service: UpdateBalanceService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [UpdateBalanceService],
    }).compile();

    service = module.get<UpdateBalanceService>(UpdateBalanceService);
    await module.init();
  });

  afterEach(async () => await module.close());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should handle sendMessage with the correct arguments', async () => {
    const wallet = '123A';
    const transaction: RegisterTransactionEventDto = {
      type: TransactionType.CREDIT,
      event: EventType.DEPOSIT,
      amount: 20,
      timestamp: new Date().getTime(),
    };
    const sendMessageSpy = jest.spyOn(service, 'emitMessage');

    service.updateBalance(wallet, transaction);

    const expectedPayload: TransactionEventDto = {
      wallet,
      amount: transaction.amount,
      type: transaction.type,
      event: transaction.event,
      timestamp: transaction.timestamp,
    };

    expect(sendMessageSpy).toHaveBeenCalledWith(
      ActionType.UPDATE_BALANCE,
      expectedPayload,
    );
  });
});
