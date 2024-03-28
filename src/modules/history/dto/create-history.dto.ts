import { IsEnum } from 'class-validator';

export class CreateHistoryDto {
  productId: string;
  @IsEnum({ I: 'INCREASE', D: 'DECREASE' })
  type: string;
  amount: number;
  prev_value: number;
  current_value: number;
}
