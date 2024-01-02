import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from '@common/types';
import { XlsFileInterface } from '../interfaces/xls-file.interface';

@Entity('xls-file')
export class XlsFileEntity implements XlsFileInterface {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  filename: string;

  @Column()
  originalName: string;
}
