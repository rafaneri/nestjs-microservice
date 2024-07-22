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

  async create(data: T): Promise<T> {
    const entity = await this.model.create(data);
    return entity.toObject();
  }

  async findAll(filter = {}, projection?: any): Promise<T[]> {
    const list = await this.model.find(filter, projection).lean<T[]>();
    return list;
  }

  async aggregate(pipeline: any[]): Promise<any> {
    return await this.model.aggregate(pipeline).exec();
  }

  async update(id: mongoose.Types.ObjectId | string, data: T): Promise<T> {
    const entity = await this.model.findByIdAndUpdate(id, data, { new: true });
    return entity.toObject();
  }
}
