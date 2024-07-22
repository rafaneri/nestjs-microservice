import { ApiProperty } from '@nestjs/swagger';
import { EventType } from '../../enum/event-type.enum';
import { TransactionType } from '../../enum/transacrion-type.enum';

/**
 * @description Interface de transferência de dados para registrar o evento de uma transação vinda do cliente
 */
export class RegisterTransactionEventDto {
  /**
   * @description Tipo de transação
   * @type {TransactionType}
   * @memberof RegisterTransactionEventDto
   */
  @ApiProperty({
    description: 'Tipo de transação [1: CREDIT, -1: DEBIT]',
    type: 'TransactionType',
    enum: TransactionType,
  })
  type: TransactionType;
  /**
   * @description Tipo do evento que ocorreu
   * @type {EventType}
   * @memberof RegisterTransactionEventDto
   */
  @ApiProperty({
    description: 'Tipo do evento que ocorreu na conta',
    type: 'EventType',
    enum: EventType,
  })
  event: EventType;
  /**
   * @description Valor da transação (sempre positivo)
   * @type {number}
   * @memberof RegisterTransactionEventDto
   * @default 0
   */
  @ApiProperty({
    description: 'Valor da transação (sempre positivo)',
    type: 'number',
    default: 0,
  })
  amount: number;
  /**
   * @description Timestamp da transação
   * @type {number}
   * @memberof RegisterTransactionEventDto
   * @default new Date().getTime()
   */
  @ApiProperty({
    description: 'Timestamp da transação UTC',
    type: 'number',
  })
  timestamp: number;
}
