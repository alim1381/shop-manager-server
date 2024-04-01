import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { DatabaseModule } from '../../configs/database/database.module';
import { shopProviders } from './providers/shop.provider';
import { ProductsModule } from '../products/products.module';
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [DatabaseModule, ProductsModule, HistoryModule],
  controllers: [ShopController],
  providers: [...shopProviders, ShopService],
  exports: [...shopProviders],
})
export class ShopModule {}
