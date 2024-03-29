import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'shop name', default: 'amazon' })
  shop_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'user name for login', default: 'alim' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'panel password', default: '12345678' })
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'user name for login', default: 'alim' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'panel password', default: '12345678' })
  password: string;
}
