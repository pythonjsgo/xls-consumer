import * as xlsx from 'xlsx';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { XlsFileEntity } from './entities/xls-file.entity';
import { Repository } from 'typeorm';
import { SaleEntity } from './entities/sale.entity';
@Injectable()
export class XlsFileHandlerService {
  constructor(
    @InjectRepository(XlsFileEntity)
    private readonly xlsFileRepository: Repository<XlsFileEntity>,
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<XlsFileEntity>,
  ) {}
  async processXlsFile(file) {
    const xlsFile = this.xlsFileRepository.create({
      originalName: file.originalname,
      filename: file.filename,
    });
    this.xlsFileRepository.save(xlsFile);

    file.buffer = Buffer.from(file.buffer, 'base64');
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    const sales: SaleEntity[] = [];

    data.forEach((row: any) => {
      const sale = new SaleEntity();
      sale.productTitle = row['Название товара'];
      sale.price = parseFloat(row['Цена']);
      sale.count = parseInt(row['Количество']);
      sales.push(sale);
    });

    return await this.saleRepository.save(sales);
  }
}
