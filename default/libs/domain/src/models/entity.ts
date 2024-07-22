import { index, mongoose, pre } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { EntityInterface } from '../interfaces';

@pre<Entity>('save', function () {
  if (this.isNew && !this.createdAt) {
    this.createdAt = this.updatedAt = new Date();
  } else {
    this.updatedAt = new Date();
  }
})
@index({ createdAt: 1 })
export class Entity extends TimeStamps implements EntityInterface {
  _id?: mongoose.Types.ObjectId | string;

  constructor(data?: Partial<Entity>) {
    super();
    Object.assign(this, data);
  }
}
