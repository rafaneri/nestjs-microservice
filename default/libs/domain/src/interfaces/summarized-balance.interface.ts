import { EntityInterface } from './entity.interface';

/**
 * @description Interface para representar o resumo do saldo de uma carteira por dia
 */
export interface SummarizedBalanceInterface extends EntityInterface {
  /**
   * @description Identificador da carteira
   * @type {any}
   * @memberof SummarizedBalanceInterface
   */
  wallet: any;
  /**
   * @description Saldo da carteira
   * @type {number}
   * @memberof SummarizedBalanceInterface
   */
  balance: number;
  /**
   * @description Data do resumo (YYYY-MM-DD)
   * @type {string}
   * @memberof SummarizedBalanceInterface
   */
  date: string;
}
