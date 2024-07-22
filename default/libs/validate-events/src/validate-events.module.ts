import { Module } from '@nestjs/common';
import { ValidateEventsService } from './validate-events.service';
import { RepositoryModule } from '@wallet/repository';

@Module({
  imports: [RepositoryModule],
  providers: [ValidateEventsService],
  exports: [ValidateEventsService],
})
export class ValidateEventsModule {}
