import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * @description Módulo responsável pelo carregamento do arquivo de configuração para compartilhar com os demais serviços
 */
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class BootstrapConfigModule {}
