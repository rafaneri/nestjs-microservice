import { Module } from '@nestjs/common';
import { ListStatementController } from './list-statement.controller';
import { ListStatementService } from './list-statement.service';
import { ListStatementRepository } from './list-statement.repository';
import { RepositoryModule } from '@wallet/repository';

@Module({
  imports: [RepositoryModule],
  controllers: [ListStatementController],
  providers: [ListStatementService, ListStatementRepository],
  exports: [ListStatementService, ListStatementRepository],
})
export class ListStatementModule {}
