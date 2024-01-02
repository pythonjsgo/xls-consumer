import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { XlsFileHandlerModule } from './xls-file-handler/xls-file-handler.module';
import { XlsFileHandlerService } from './xls-file-handler/xls-file-handler.service';
import { XlsFileHandlerController } from './xls-file-handler/xls-file-handler.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XlsFileEntity } from './xls-file-handler/entities/xls-file.entity';
import { SaleEntity } from "./xls-file-handler/entities/sale.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('PG_HOST'),
          port: configService.get('PG_PORT'),
          username: configService.get('PG_USERNAME'),
          password: configService.get('PG_PASSWORD'),
          database: configService.get('PG_DBNAME'),
          entities: [XlsFileEntity, SaleEntity],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    XlsFileHandlerModule,
  ],
  controllers: [AppController, XlsFileHandlerController],
  // @ts-ignore
  providers: [AppService, ClientProxy],
})
export class AppModule {}
