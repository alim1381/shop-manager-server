import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsEmpty()
  shopId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'title for product', example: 'book' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'desc... for product',
    example: 'a book for programming learning',
  })
  discription: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'initial count', example: 2, minimum: 0 })
  count: string;
}
