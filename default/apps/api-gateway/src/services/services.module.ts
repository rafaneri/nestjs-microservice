import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GetBalanceService } from './get-balance/get-balance.service';
import { ListStatementService } from './list-statement/list-statement.service';
import { UpdateBalanceService } from './update-balance/update-balance.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [GetBalanceService, ListStatementService, UpdateBalanceService],
  exports: [GetBalanceService, ListStatementService, UpdateBalanceService],
})
export class ServicesModule {}
