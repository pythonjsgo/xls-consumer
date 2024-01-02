import { Controller } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  MessagePattern,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { XlsFileHandlerService } from "./xls-file-handler.service";

@Controller()
export class XlsFileHandlerController {
  constructor(
    private readonly configService: ConfigService,
    private readonly client: ClientProxy,
    private readonly xlsFileHandlerService: XlsFileHandlerService
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get('RABBIT_MQ')], // Change to your RabbitMQ URL
        queue: this.configService.get('RABBIT_MQ_QUEUE'),
      },
    });
  }
  @MessagePattern({ cmd: 'processXlsFile' })
  async processXlsFile(file) {
    console.log('Received message from RabbitMQ:', file.toString());
    console.log(file, 'fdfdkhfdjh')
    //return { done: true }
    return await this.xlsFileHandlerService.processXlsFile(file)
    //await this.client.send({ cmd: 'xlsFileProcessed' }, data).toPromise();
  }
}
