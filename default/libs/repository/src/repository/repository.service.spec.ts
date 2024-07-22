import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryService } from './repository.service';
import { MongoRepository } from '../generic/mongo-repository';
import { Entity } from '../../../domain/src';

describe('RepositoryService', () => {
  let service: RepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepositoryService],
    }).compile();

    service = module.get<RepositoryService>(RepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve a repository', () => {
    const repository = new MongoRepository(Entity);
    const result = service.getRepository(Entity);

    expect(result.name()).toBe(repository.name());
  });
});
