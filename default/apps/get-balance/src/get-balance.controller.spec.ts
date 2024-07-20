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

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(getBalanceController.getHello()).toBe('Hello World!');
    });
  });
});
