import { Test, TestingModule } from '@nestjs/testing';
import { ListStatementController } from './list-statement.controller';
import { ListStatementService } from './list-statement.service';
import { ListStatementRepository } from './list-statement.repository';
import { RepositoryModule } from '@wallet/repository';

describe('ListStatementController', () => {
  let listStatementController: ListStatementController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [RepositoryModule],
      controllers: [ListStatementController],
      providers: [ListStatementService, ListStatementRepository],
    }).compile();

    listStatementController = app.get<ListStatementController>(
      ListStatementController,
    );
  });

  it('should be defined', () => {
    expect(listStatementController).toBeDefined();
  });

  it('should be greater than or equals to 0', async () => {
    const walletCode = 'existing_wallet';
    const result = await listStatementController.listStatement(walletCode);

    expect(result.length).toBeGreaterThanOrEqual(0);
  });
});
