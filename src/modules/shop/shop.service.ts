import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Shop } from './interfaces/shop.interface';
import { RegisterDto } from '../auth/dto/auth.dto';

@Injectable()
export class ShopService {
  constructor(@Inject('SHOP_MODEL') private readonly shopModel: Model<Shop>) {}

  async findByUsername(username: String) {
    return await this.shopModel.findOne({ username });
  }

  async createNewShop(registerDto: RegisterDto) {
    const newShop = await this.shopModel.create(registerDto);
    await newShop.save();
    return newShop;
  }
}
