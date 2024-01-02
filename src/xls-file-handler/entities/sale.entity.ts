import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { XlsFileInterface } from '../interfaces/xls-file.interface';
import { UUID } from '@common/types';
import { SaleInterface } from '../interfaces/sale.interface';

@Entity('sale')
export class SaleEntity implements SaleInterface {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  productTitle: string;

  @Column()
  price: number;

  @Column()
  count: number;
}
