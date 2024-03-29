import {
  Controller,
  Post,
  Body,
  HttpException,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ShopService } from '../shop/shop.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly shopService: ShopService,
  ) {}

  @Get('who-i-am')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  async whoIAm(@Req() req: any) {
    return req.user;
  }

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
