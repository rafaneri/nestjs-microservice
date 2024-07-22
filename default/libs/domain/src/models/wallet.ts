import { index, prop } from '@typegoose/typegoose';
import { WalletInterface } from '../interfaces';
import { Entity } from './entity';
import { SummarizedBalance } from './summarized-balance';

@index({ code: 1 }, { unique: true })
export class Wallet extends Entity implements WalletInterface {
  constructor(data?: Partial<Wallet>) {
    super();
    Object.assign(this, data);
  }

  @prop({ required: true })
  code: string;

  @prop({ default: 0 })
  balance?: number;

  @prop({ type: () => [SummarizedBalance], default: [] })
  sumarizedBallance?: SummarizedBalance[];
}
