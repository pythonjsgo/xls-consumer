import { UUID } from '@common/types';

export interface SaleInterface {
  id: UUID;
  productTitle: string;
  price: number;
  count: number;
}
