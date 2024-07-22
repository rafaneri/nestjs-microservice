import { modelOptions, prop, Severity } from '@typegoose/typegoose';
import { EventType, TransactionType } from '../enum';
import { TransactionInterface } from '../interfaces';
import { Entity } from './entity';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class TransactionEvent extends Entity implements TransactionInterface {
  constructor(data?: Partial<TransactionEvent>) {
    super();
    Object.assign(this, data);
  }

  /**
   * @description Identificador amigavel da carteira
   */
  @prop({ index: 1 })
  wallet: string;

  @prop()
  type: TransactionType;

  @prop()
  event: EventType;

  @prop({ default: 0 })
  amount: number;

  @prop()
  timestamp: number;
}
