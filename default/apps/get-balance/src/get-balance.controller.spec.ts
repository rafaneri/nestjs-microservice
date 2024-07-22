import { Test, TestingModule } from '@nestjs/testing';
import { GetBalanceController } from './get-balance.controller';
import { GetBalanceService } from './get-balance.service';

describe('GetBalanceController', () => {
  let getBalanceController: GetBalanceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GetBalanceController],
      providers: [GetBalanceService],
    }).compile();

    getBalanceController = app.get<GetBalanceController>(GetBalanceController);
  });

  it('should be defined', () => {
    expect(getBalanceController).toBeDefined();
  });

  it('should be "1"', () => {
    expect(getBalanceController.getBalance('1')).toBe(1);
  });
});
