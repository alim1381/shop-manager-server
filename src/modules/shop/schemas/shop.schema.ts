import * as mongoose from 'mongoose';

export const ShopSchema = new mongoose.Schema(
  {
    shop_name: { type: String, required: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { timestamps: true },
);
