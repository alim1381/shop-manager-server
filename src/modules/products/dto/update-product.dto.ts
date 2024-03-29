import { ApiProperty } from '@nestjs/swagger';
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

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID of the desired product',
    example: '6606090185dbb148a4d9c645',
  })
  productId: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum({ I: 'INCREASE', D: 'DECREASE' })
  @ApiProperty({
    description: 'type of operation',
    example: 'INCREASE',
    enum: ['INCREASE', 'DECREASE'],
  })
  type: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(1)
  @ApiProperty({ description: 'desired value', example: 2 })
  amount: number;
}
