import * as mongoose from 'mongoose';

export const ProductsSchema = new mongoose.Schema(
  {
    shopId: { type: mongoose.Types.ObjectId, ref : "Shop" , required: true },
    title: { type: String, require: true },
    discription: { type: String, require: true },
    count: { type: Number, require: true },
    image: { type: String, require: true },
  },
  { timestamps: true },
);
