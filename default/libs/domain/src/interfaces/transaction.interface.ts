import { TransactionType } from '../enum';
import { EventType } from '../enum/event-type.enum';
import { EntityInterface } from './entity.interface';

/**
 * @description Interface para representar uma transação em uma carteira
 */
export interface TransactionInterface extends EntityInterface {
  /**
   * @description Tipo de transação
   * @type {TransactionType}
   * @memberof TransactionInterface
   */
  type: TransactionType;
  /**
   * @description Identificador da carteira
   * @type {string}
   * @memberof TransactionInterface
   */
  wallet: string;
  /**
   * @description Tipo do evento que ocorreu
   * @type {EventType}
   * @memberof TransactionInterface
   */
  event: EventType;
  /**
   * @description Valor da transação (sempre positivo)
   * @type {number}
   * @memberof TransactionInterface
   * @default 0
   */
  amount: number;
  /**
   * @description Timestamp da transação
   * @type {number}
   * @memberof TransactionInterface
   * @default new Date().getTime()
   */
  timestamp: number;
}
