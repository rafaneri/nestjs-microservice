import { Test, TestingModule } from '@nestjs/testing';
import { GetBalanceService } from './get-balance.service';
import { ConfigModule } from '@nestjs/config';

describe('GetBalanceService', () => {
  let service: GetBalanceService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [GetBalanceService],
    }).compile();

    service = module.get<GetBalanceService>(GetBalanceService);
    await module.init(); // Initialize the NestJS module
  });

  afterEach(async () => await module.close());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return "1"', async () => {
    const result = await service.send(1);
    expect(result).toBe(1);
  });

  it('should throw an error if called with wrong parameters', () => {
    expect(async () => {
      await service.sendMessage('', 1);
    }).rejects.toThrow();
  });
});
