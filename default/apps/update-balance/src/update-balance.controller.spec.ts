import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBalanceController } from './update-balance.controller';
import { UpdateBalanceService } from './update-balance.service';

describe('UpdateBalanceController', () => {
  let updateBalanceController: UpdateBalanceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UpdateBalanceController],
      providers: [UpdateBalanceService],
    }).compile();

    updateBalanceController = app.get<UpdateBalanceController>(UpdateBalanceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(updateBalanceController.getHello()).toBe('Hello World!');
    });
  });
});
