import { Injectable } from '@nestjs/common';
import { MongoRepository } from '../generic/mongo-repository';
import { Entity } from '@wallet/domain';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';

@Injectable()
export class RepositoryService {
  private repositories: Map<string, MongoRepository<any>>;

  getRepository<T extends Entity>(
    cl: AnyParamConstructor<T>,
  ): MongoRepository<T> {
    if (!this.repositories) {
      this.repositories = new Map();
    }
    if (!this.repositories.has(cl.name)) {
      this.repositories.set(cl.name, new MongoRepository(cl));
    }
    return this.repositories.get(cl.name);
  }
}
