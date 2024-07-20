import { RegisterTransactionEventDtoInterface } from './register-transaction-event.dto.interface';

/**
 * @description Interface de transferência de dados para registrar o evento de uma transação vinda de outro microserviço
 */
export interface TransactionEventDtoInterface
  extends RegisterTransactionEventDtoInterface {
  /**
   * @description Identificador da carteira
   * @type {string}
   * @memberof TransactionEventDtoInterface
   */
  wallet: string;
}
