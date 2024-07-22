import { ApiProperty } from '@nestjs/swagger';
/**
 * @description Interface de transferência de dados para obter o saldo da carteira
 */
export class BalanceDto {
  /**
   * @description Saldo da carteira
   * @type {number}
   * @memberof BalanceDto
   * @default 0
   */
  @ApiProperty({
    description: 'Saldo da carteira',
    type: 'number',
    default: 0,
  })
  balance: number;
}
