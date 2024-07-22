import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBalanceController } from './update-balance.controller';
import { UpdateBalanceService } from './update-balance.service';
import {
  EventType,
  TransactionEventDtoInterface,
  TransactionType,
} from '@wallet/domain';

describe('UpdateBalanceController', () => {
  let updateBalanceController: UpdateBalanceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UpdateBalanceController],
      providers: [UpdateBalanceService],
    }).compile();

    updateBalanceController = app.get<UpdateBalanceController>(
      UpdateBalanceController,
    );
  });

  it('should be defined', () => {
    expect(updateBalanceController).toBeDefined();
  });

  it('should handle updateBalance with the correct arguments', async () => {
    const updateBalanceService = { updateBalance: jest.fn() };
    const controller = new UpdateBalanceController(updateBalanceService);
    const timestamp = new Date().getTime();
    const transaction: TransactionEventDtoInterface = {
      wallet: '123A',
      type: TransactionType.CREDIT,
      event: EventType.DEPOSIT,
      amount: 20,
      timestamp,
    };
    controller.updateBalance(transaction);
    expect(updateBalanceService.updateBalance).toHaveBeenCalledWith(
      transaction,
    );
  });
});
