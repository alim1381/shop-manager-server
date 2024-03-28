import * as mongoose from 'mongoose';

export const HistorySchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Types.ObjectId, ref : "Products" , required: true },
    type: {type: String, enum: ['INCREASE', 'DECREASE'] ,required: true},
    amount: {type: Number, required: true},
    prev_value: {type: Number, required: true},
    current_value: {type: Number, required: true},
  },
  { timestamps: true },
);
