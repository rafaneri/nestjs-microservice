import { prop, Ref } from '@typegoose/typegoose';
import { EventType, TransactionType } from '../enum';
import { TransactionInterface } from '../interfaces';
import { Entity } from './entity';
import { Wallet } from './wallet';

export class Transaction extends Entity implements TransactionInterface {
  constructor(data?: Partial<Transaction>) {
    super();
    Object.assign(this, data);
  }

  @prop({ index: 1, ref: () => Wallet })
  wallet: Ref<Wallet>;

  @prop()
  type: TransactionType;

  @prop()
  event: EventType;

  @prop({ default: 0 })
  amount: number;

  @prop()
  timestamp: number;
}
