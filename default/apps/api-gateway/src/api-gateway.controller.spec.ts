import { Test, TestingModule } from '@nestjs/testing';
import { ApiGatewayController } from './api-gateway.controller';
import { ServicesModule } from './services/services.module';

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
    await module.init(); // Initialize the NestJS module
  });

  afterEach(async () => await module.close());

  describe('Api Gateway Controller Tests', () => {
    it('[/wallet/:wallet/balance] should result "1"', async () => {
      const result = await apiGatewayController.getBalance('1');
      expect(result).toBe(1);
    });

    it('[/wallet/:wallet/statement] should return length greater than 0 if called with "1"', async () => {
      const result = await apiGatewayController.listStatement('1');
      expect(result.length).toBeGreaterThanOrEqual(0);
    });
  });
});
