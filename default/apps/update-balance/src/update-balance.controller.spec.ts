import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBalanceController } from './update-balance.controller';
import { UpdateBalanceService } from './update-balance.service';
import {
  EventType,
  TransactionEventDto,
  TransactionType,
} from '@wallet/domain';
import { UpdateBalanceRepository } from './update-balance.repository';
import { RepositoryModule } from '@wallet/repository';
import { generateRandomAccount } from '../../utils/utils';
import {
  ValidateEventsModule,
  ValidateEventsService,
} from '@wallet/validate-events';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('UpdateBalanceController', () => {
  let updateBalanceController: UpdateBalanceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        RepositoryModule,
        ValidateEventsModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
      controllers: [UpdateBalanceController],
      providers: [
        UpdateBalanceService,
        UpdateBalanceRepository,
        ValidateEventsService,
        ConfigService,
      ],
    }).compile();

    updateBalanceController = app.get<UpdateBalanceController>(
      UpdateBalanceController,
    );
  });

  it('should be defined', () => {
    expect(updateBalanceController).toBeDefined();
  });

  it('should handle updateBalance with the correct arguments', async () => {
    const controller = { updateBalance: jest.fn() };
    const timestamp = new Date().getTime();
    const code = generateRandomAccount(10);
    const transaction: TransactionEventDto = {
      wallet: code,
      type: TransactionType.CREDIT,
      event: EventType.DEPOSIT,
      amount: 20,
      description: 'Deposit internet bank',
      timestamp,
    };
    controller.updateBalance(transaction);
    expect(controller.updateBalance).toHaveBeenCalledWith(transaction);
  });
});
