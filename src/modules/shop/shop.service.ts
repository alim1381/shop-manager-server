import { Inject, Injectable, Optional } from '@nestjs/common';
import { Model } from 'mongoose';
import { Shop } from './interfaces/shop.interface';
import { RegisterDto } from '../auth/dto/auth.dto';
import { ProductsService } from '../products/products.service';
import { HistoryService } from '../history/history.service';

@Injectable()
export class ShopService {
  constructor(
    @Inject('SHOP_MODEL') private readonly shopModel: Model<Shop>,
    @Optional() private readonly productsService: ProductsService,
    @Optional() private readonly historyService: HistoryService,
  ) {}

  async findByUsername(username: String) {
    return await this.shopModel.findOne({ username });
  }

  async findById(id: string) {
    return await this.shopModel.findOne({ _id: id }, { password: 0, __v: 0 });
  }

  async createNewShop(registerDto: RegisterDto) {
    const newShop = await this.shopModel.create(registerDto);
    await newShop.save();
    return newShop;
  }

  async getShopStatistics(shopId: string) {
    const products = await this.productsService.findAllProductsShop(shopId);
    let changeCount = 0;
    let countProduct = 0;

    for (let item of products) {
      const history = await this.historyService.productHistory(item.id, shopId);
      changeCount += history.length;
      countProduct += parseInt(item.count);
    }

    const resultData = {
      counterItem: products.length,
      counterOfChanges: changeCount,
      countProduct,
      users: 1,
    };
    return resultData;
  }
}
