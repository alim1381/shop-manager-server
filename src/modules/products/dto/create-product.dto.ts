import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsEmpty()
  shopId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  discription: string;

  @IsNotEmpty()
  count: string;
}
