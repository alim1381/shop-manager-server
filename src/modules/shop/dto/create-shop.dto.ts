import { IsNotEmpty, IsString } from "class-validator";

export class CreateShopDto {
    @IsNotEmpty()
    @IsString()
    shop_name : String;

    @IsNotEmpty()
    @IsString()
    username : String;

    @IsNotEmpty()
    @IsString()
    password : String;
}
