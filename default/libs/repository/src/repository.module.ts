import { Module } from '@nestjs/common';
import { RepositoryService } from './repository/repository.service';

@Module({
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
