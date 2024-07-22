import { Module } from '@nestjs/common';
import { UpdateBalanceController } from './update-balance.controller';
import { UpdateBalanceService } from './update-balance.service';
import { UpdateBalanceRepository } from './update-balance.repository';
import { RepositoryModule } from '@wallet/repository';
import { ConfigModule } from '@nestjs/config';
import { ValidateEventsModule } from '@wallet/validate-events';

@Module({
  imports: [RepositoryModule, ValidateEventsModule, ConfigModule.forRoot()],
  controllers: [UpdateBalanceController],
  providers: [UpdateBalanceService, UpdateBalanceRepository],
})
export class UpdateBalanceModule {}
