import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ShopService } from '../shop/shop.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly shopService: ShopService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // hash entred password for save in db
    const hashedPassword = await bcrypt.hash(registerDto.password, 5);
    // create new shop and save it to the database
    const newShop = await this.shopService.createNewShop({
      ...registerDto,
      password: hashedPassword,
    });

    // return token after successful registration
    return this.login({
      username: newShop.username.toString(),
      password: registerDto.password,
    });
  }

  async login(loginDto: LoginDto) {
    // find shop by entered username
    const shop = await this.shopService.findByUsername(loginDto.username);
    // if there is no such user throw an error
    if (!shop) throw new HttpException('Shop is Not Found', 404);
    // compare passwords
    const isMatchPassword = await bcrypt.compare(
      loginDto.password,
      shop.password.toString(),
    );
    // if passwords do not match throw an error
    if (!isMatchPassword) throw new HttpException(' Password Is Wrong', 401);

    // generate a token
    const token = this.jwtService.sign(
      { id: shop.id },
      { secret: process.env.JWT_SECRET },
    );
    // return token
    return { token };
  }
}
