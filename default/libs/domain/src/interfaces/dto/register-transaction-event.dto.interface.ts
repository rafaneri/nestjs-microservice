import { EventType } from '../../enum/event-type.enum';
import { TransactionType } from '../../enum/transacrion-type.enum';

/**
 * @description Interface de transferência de dados para registrar o evento de uma transação vinda do cliente
 */
export interface RegisterTransactionEventDtoInterface {
  /**
   * @description Tipo de transação
   * @type {TransactionType}
   * @memberof RegisterTransactionEventDtoInterface
   */
  type: TransactionType;
  /**
   * @description Tipo do evento que ocorreu
   * @type {EventType}
   * @memberof RegisterTransactionEventDtoInterface
   */
  event: EventType;
  /**
   * @description Valor da transação (sempre positivo)
   * @type {number}
   * @memberof RegisterTransactionEventDtoInterface
   * @default 0
   */
  amount: number;
  /**
   * @description Timestamp da transação
   * @type {number}
   * @memberof RegisterTransactionEventDtoInterface
   * @default new Date().getTime()
   */
  timestamp: number;
}
