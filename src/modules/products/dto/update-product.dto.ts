import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class UpdateProductDto {
  @IsEmpty()
  shopId: string;

  @IsEmpty()
  productId: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum({ I: 'INCREASE', D: 'DECREASE' })
  type: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(1)
  amount: number;
}
