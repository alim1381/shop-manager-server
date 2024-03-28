import { Document, ObjectId } from 'mongoose';

export interface Products extends Document {
  shopId: ObjectId,
  title: string,
  discription: string,
  count: string,
  image : string,
}
