import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { Model } from 'mongoose';
import { History } from './interfaces/history.interface';
import { ProductsService } from '../products/products.service';

@Injectable()
export class HistoryService {
  constructor(
    @Inject('HISTORY_MODEL') private readonly historyModel: Model<History>,
    @Inject(forwardRef(() => ProductsService))
    private readonly productsService: ProductsService,
  ) {}
  async create(createHistoryDto: CreateHistoryDto) {
    const newHistory = await this.historyModel.create(createHistoryDto);
    return newHistory;
  }

  async productHistory(productId: string, shopId: string) {
    // get the product by id and check if it exists and does belong to this shop
    const product = await this.productsService.findOneProduct(
      productId,
      shopId,
    );
    // get product historys from db
    const histories = await this.historyModel
      .find({ productId }, { __v: 0 })
      .sort({ createdAt: -1 });
      
    // return values
    return histories;
  }
}
