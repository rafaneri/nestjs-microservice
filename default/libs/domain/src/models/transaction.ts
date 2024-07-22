import { modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { EventType, TransactionType } from '../enum';
import { TransactionInterface } from '../interfaces';
import { Entity } from './entity';
import { Wallet } from './wallet';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Transaction extends Entity implements TransactionInterface {
  constructor(data?: Partial<Transaction>) {
    super();
    Object.assign(this, data);
  }

  @prop({ index: 1, type: () => Wallet, excludeIndexes: true })
  wallet: Wallet;

  @prop()
  type: TransactionType;

  @prop()
  event: EventType;

  @prop({ default: 0 })
  amount: number;

  @prop()
  description: string;

  @prop()
  timestamp: number;

  @prop()
  reference?: Ref<Transaction>;
}
