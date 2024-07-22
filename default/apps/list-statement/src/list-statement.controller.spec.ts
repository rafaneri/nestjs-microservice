import { Test, TestingModule } from '@nestjs/testing';
import { ListStatementController } from './list-statement.controller';
import { ListStatementService } from './list-statement.service';

describe('ListStatementController', () => {
  let listStatementController: ListStatementController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ListStatementController],
      providers: [ListStatementService],
    }).compile();

    listStatementController = app.get<ListStatementController>(
      ListStatementController,
    );
  });

  it('should be defined', () => {
    expect(listStatementController).toBeDefined();
  });

  it('should be greater than or equals to 0', () => {
    expect(
      listStatementController.listStatement('1').length,
    ).toBeGreaterThanOrEqual(0);
  });
});
