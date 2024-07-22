import { Test, TestingModule } from '@nestjs/testing';
import { GetBalanceController } from './get-balance.controller';
import { GetBalanceService } from './get-balance.service';
import { MongoRepository, RepositoryModule } from '@wallet/repository';
import { Wallet } from '@wallet/domain';
import { GetBalanceRepository } from './get-balance.repository';

describe('GetBalanceController', () => {
  let getBalanceController: GetBalanceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [RepositoryModule],
      controllers: [GetBalanceController],
      providers: [GetBalanceService, GetBalanceRepository],
    }).compile();

    getBalanceController = app.get<GetBalanceController>(GetBalanceController);
  });

  it('should be defined', () => {
    expect(getBalanceController).toBeDefined();
  });

  it('should be "100"', async () => {
    const walletCode = 'existing_wallet';
    const repository = new MongoRepository(Wallet);
    await repository.create({ code: walletCode, balance: 100 });
    const balanceDto = await getBalanceController.getBalance(walletCode);
    expect(balanceDto.balance).toBe(100);
  });
});
