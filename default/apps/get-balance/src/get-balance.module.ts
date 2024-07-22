import { Module } from '@nestjs/common';
import { GetBalanceController } from './get-balance.controller';
import { GetBalanceService } from './get-balance.service';
import { RepositoryModule } from '@wallet/repository';
import { GetBalanceRepository } from './get-balance.repository';

@Module({
  imports: [RepositoryModule],
  controllers: [GetBalanceController],
  providers: [GetBalanceService, GetBalanceRepository],
  exports: [GetBalanceService, GetBalanceRepository],
})
export class GetBalanceModule {}
