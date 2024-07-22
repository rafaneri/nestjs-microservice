import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URL'),
        dbName: configService.get('MONGO_DATABASE'),
        autoIndex: true,
        autoCreate: true,
        onConnectionCreate: () =>
          Logger.log(`🌨️  Database connected`, 'Mongoose'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [],
  exports: [],
})
export class RepositoryModule {}
