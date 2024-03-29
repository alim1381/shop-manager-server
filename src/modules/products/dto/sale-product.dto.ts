import { Type } from 'class-transformer';
import { UpdateProductDto } from './update-product.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaleProductDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductDto)
  @ApiProperty({
    example: [
      {
        productId: '6606090185dbb148a4d9c645',
        type: 'INCREASE',
        amount: 2,
      },
    ],
  })
  products: UpdateProductDto[];
}
