import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopModule } from './modules/shop/shop.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { HistoryModule } from './modules/history/history.module';

@Module({
  imports: [ShopModule, AuthModule, ConfigModule.forRoot(), ProductsModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
