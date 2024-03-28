import { Document, ObjectId } from 'mongoose';

export interface History extends Document {
  productId: ObjectId;
  type: string;
  amount: number;
  prev_value: number;
  current_value: number;
}
