import { Module } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { XlsFileHandlerService } from './xls-file-handler.service';
import { XlsFileHandlerController } from './xls-file-handler.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XlsFileEntity } from './entities/xls-file.entity';
import { SaleEntity } from "./entities/sale.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([XlsFileEntity, SaleEntity]),
    ClientsModule.register([
      {
        name: 'XLS_CONSUMER', // This name is used to identify the microservice
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'], // RabbitMQ server URL
          queue: 'xls-file-queue',
        },
      },
    ]),
  ],
  // @ts-expect-error
  providers: [XlsFileHandlerService, ClientProxy],
  controllers: [XlsFileHandlerController],
  exports: [XlsFileHandlerService, ClientsModule],
})
export class XlsFileHandlerModule {}
