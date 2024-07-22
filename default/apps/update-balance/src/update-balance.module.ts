import { Module } from '@nestjs/common';
import { UpdateBalanceController } from './update-balance.controller';
import { UpdateBalanceService } from './update-balance.service';
import { UpdateBalanceRepository } from './update-balance.repository';
import { RepositoryModule } from '@wallet/repository';

@Module({
  imports: [RepositoryModule],
  controllers: [UpdateBalanceController],
  providers: [UpdateBalanceService, UpdateBalanceRepository],
})
export class UpdateBalanceModule {}
