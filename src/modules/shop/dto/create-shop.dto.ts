import { IsNotEmpty, IsString } from "class-validator";

export class CreateShopDto {
    @IsNotEmpty()
    @IsString()
    shop_name : string;

    @IsNotEmpty()
    @IsString()
    username : string;

    @IsNotEmpty()
    @IsString()
    password : string;
}
