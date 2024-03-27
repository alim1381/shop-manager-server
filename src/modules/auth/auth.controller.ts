import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ShopService } from '../shop/shop.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly shopService: ShopService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // Check if the username already exists in the database
    const shop = await this.shopService.findByUsername(registerDto.username);
    if (shop) throw new HttpException('shop already exists', 409);
    // If not, create a new shop and return it
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // Validate the user's credentials and return a token if they are correct
    return this.authService.login(loginDto);
  }
}
