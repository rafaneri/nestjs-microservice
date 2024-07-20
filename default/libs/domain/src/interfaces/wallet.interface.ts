import { EntityInterface } from './entity.interface';

/**
 * @description Interface para representar uma carteira
 */
export interface WalletInterface extends EntityInterface {
  /**
   * @description Código identificador da carteira
   * @type {number}
   * @memberof WalletInterface
   */
  code: number;
  /**
   * @description Saldo da carteira
   * @type {number}
   * @memberof WalletInterface
   * @default 0
   */
  balance: number;
}
