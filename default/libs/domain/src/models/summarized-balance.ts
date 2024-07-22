import { index, prop, Ref } from '@typegoose/typegoose';
import { SummarizedBalanceInterface } from '../interfaces/summarized-balance.interface';
import { Entity } from './entity';
import { Wallet } from './wallet';

@index({ wallet: 1, date: 1 })
export class SummarizedBalance
  extends Entity
  implements SummarizedBalanceInterface
{
  constructor(data?: Partial<SummarizedBalance>) {
    super();
    Object.assign(this, data);
  }

  @prop({ default: 0 })
  balance: number;

  @prop({ index: 1, ref: () => Wallet, required: true })
  wallet: Ref<Wallet>;

  @prop({ index: 1, required: true })
  date: string;
}
