import { Mongoose } from 'mongoose';
import { ShopSchema } from '../schemas/shop.schema';

export const shopProviders = [
  {
    provide: 'SHOP_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Shop', ShopSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
