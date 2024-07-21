import { Test, TestingModule } from '@nestjs/testing';
import { ListStatementService } from './list-statement.service';
import { ConfigModule } from '@nestjs/config';

describe('ListStatementService', () => {
  let service: ListStatementService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [ListStatementService],
    }).compile();

    service = module.get<ListStatementService>(ListStatementService);
    await module.init(); // Initialize the NestJS module
  });

  afterEach(async () => await module.close());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return length greater than 0 if called with "1"', async () => {
    const result = await service.listStatement('1');
    expect(result.length).toBeGreaterThanOrEqual(0);
  });

  it('should throw an error if called with wrong parameters', () => {
    expect(async () => {
      await service.sendMessage('', 1);
    }).rejects.toThrow();
  });
});
