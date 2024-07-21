import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GetBalanceService } from './get-balance/get-balance.service';
import { ListStatementService } from './list-statement/list-statement.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [GetBalanceService, ListStatementService],
  exports: [GetBalanceService, ListStatementService],
})
export class ServicesModule {}
