import { Module } from '@nestjs/common';
import { GetBalanceController } from './get-balance.controller';
import { GetBalanceService } from './get-balance.service';

@Module({
  imports: [],
  controllers: [GetBalanceController],
  providers: [GetBalanceService],
})
export class GetBalanceModule {}
