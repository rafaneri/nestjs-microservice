import { EntityInterface } from './entity.interface';
import { SummarizedBalanceInterface } from './summarized-balance.interface';

/**
 * @description Interface para representar uma carteira
 */
export interface WalletInterface extends EntityInterface {
  /**
   * @description Código identificador da carteira
   * @type {string}
   * @memberof WalletInterface
   */
  code: string;
  /**
   * @description Saldo da carteira
   * @type {number}
   * @memberof WalletInterface
   * @default 0
   */
  balance: number;
  /**
   * @description Resumo do saldo da carteira
   * @type {SummarizedBalanceInterface[]}
   * @memberof WalletInterface
   * @default null
   */
  sumarizedBallance?: SummarizedBalanceInterface[];
}
