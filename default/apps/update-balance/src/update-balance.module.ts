import { Module } from '@nestjs/common';
import { UpdateBalanceController } from './update-balance.controller';
import { UpdateBalanceService } from './update-balance.service';

@Module({
  imports: [],
  controllers: [UpdateBalanceController],
  providers: [UpdateBalanceService],
})
export class UpdateBalanceModule {}
