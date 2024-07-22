import { IGenericRepository } from './generic-repository.interface';
import { getModelForClass, mongoose } from '@typegoose/typegoose';
import {
  AnyParamConstructor,
  ReturnModelType,
} from '@typegoose/typegoose/lib/types';
import { Entity } from '../../../domain/src/models/entity';

export class MongoRepository<T extends Entity>
  implements IGenericRepository<T>
{
  private model: ReturnModelType<AnyParamConstructor<T>>;
  constructor(cl: AnyParamConstructor<T>) {
    this.model = getModelForClass<AnyParamConstructor<T>>(cl);
  }

  name(): string {
    return this.model.modelName;
  }

  async create(data: T): Promise<T> {
    const entity = await this.model.create(data);
    return entity.toObject();
  }

  async findOne(filter = {}, projection?: any): Promise<T | null> {
    return this.model.findOne(filter, projection).lean<T | null>().exec();
  }

  async findAll(filter = {}, projection?: any): Promise<T[]> {
    return this.model.find(filter, projection).lean<T[]>().exec();
  }

  async aggregate(pipeline: any[]): Promise<any> {
    return await this.model.aggregate(pipeline).exec();
  }

  async update(id: mongoose.Types.ObjectId | string, data: T): Promise<T> {
    const entity = await this.model.findByIdAndUpdate(id, data, { new: true });
    return entity.toObject();
  }
}
