import { Module, forwardRef } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { historyProviders } from './providers/history.provider';
import { DatabaseModule } from 'src/modules/database/database.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => ProductsModule)],
  controllers: [HistoryController],
  providers: [...historyProviders, HistoryService],
  exports: [...historyProviders, HistoryService],
})
export class HistoryModule {}
