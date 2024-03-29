import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule } from 'src/modules/database/database.module';
import { productsProviders } from './providers/products.provider';
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => HistoryModule)],
  controllers: [ProductsController],
  providers: [...productsProviders, ProductsService],
  exports: [...productsProviders, ProductsService],
})
export class ProductsModule {}
