import { Module } from '@nestjs/common';
import { GetBalanceController } from './get-balance.controller';
import { GetBalanceService } from './get-balance.service';
import { RepositoryModule } from '@wallet/repository';

@Module({
  imports: [RepositoryModule],
  controllers: [GetBalanceController],
  providers: [GetBalanceService],
})
export class GetBalanceModule {}
