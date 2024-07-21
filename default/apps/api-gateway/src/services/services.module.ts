import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GetBalanceService } from './get-balance/get-balance.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [GetBalanceService],
  exports: [GetBalanceService],
})
export class ServicesModule {}
