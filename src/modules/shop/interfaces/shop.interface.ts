import { Document } from 'mongoose';

export interface Shop extends Document {
  shop_name: String;
  username: String;
  password: String;
}
