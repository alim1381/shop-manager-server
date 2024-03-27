import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ShopService } from '../shop/shop.service';
import { ShopModule } from '../shop/shop.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategys/jwt.strategy';

@Module({
  imports: [
    ShopModule,
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ShopService, JwtStrategy],
})
export class AuthModule {}
