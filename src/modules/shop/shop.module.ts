import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { DatabaseModule } from 'src/configs/database/database.module';
import { shopProviders } from './providers/shop.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ShopController],
  providers: [...shopProviders, ShopService],
  exports: [
    ...shopProviders
  ],
})
export class ShopModule {}
