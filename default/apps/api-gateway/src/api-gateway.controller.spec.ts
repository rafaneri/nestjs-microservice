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

  describe('root', () => {
    it('should result "1"', async () => {
      const result = await apiGatewayController.getBalance(1);
      expect(result).toBe(1);
    });
  });
});
