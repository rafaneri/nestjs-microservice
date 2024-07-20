import { Module } from '@nestjs/common';
import { ListStatementController } from './list-statement.controller';
import { ListStatementService } from './list-statement.service';

@Module({
  imports: [],
  controllers: [ListStatementController],
  providers: [ListStatementService],
})
export class ListStatementModule {}
