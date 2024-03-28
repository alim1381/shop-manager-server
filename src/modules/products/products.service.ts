import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Model } from 'mongoose';
import { Products } from './interfaces/products.interface';
import { Express } from 'express';
import { saveInStorage } from 'src/common/firebase/firebase.util';
import { UpdateProductDto } from './dto/update-product.dto';
import { HistoryService } from '../history/history.service';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_MODEL') private readonly productsModel: Model<Products>,
    @Inject(forwardRef(() => HistoryService))
    private readonly historyService: HistoryService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    imageFile: Express.Multer.File,
  ) {
    // Save the file in storage and get its download URL
    const imagePath = await saveInStorage(imageFile);
    // create a new product object with the provided data
    const newProduct = await this.productsModel.create({
      ...createProductDto,
      image: imagePath,
    });
    //   return a success message to user
    return 'Product Create Successfully!';
  }

  async findAllProductsShop(shopId: string) {
    // getting products related to this shop from db
    const products = await this.productsModel
      .find({ shopId }, { __v: 0 })
      .sort({ createdAt: -1 });
    // return result product
    return products;
  }

  async findOneProduct(productId: string, shopId: string) {
    // find product from db
    const product = await this.productsModel.findById(productId, { __v: 0 });
    // check if product is not found or does belong to this shop
    this.isValidProduct(product, shopId);

    // return result product
    return product;
  }

  async updateCount(updateProductDto: UpdateProductDto) {
    // find product form db
    let product = await this.productsModel.findById(updateProductDto.productId);
    // check if product is not found or does belong to this shop
    this.isValidProduct(product, updateProductDto.shopId);

    // check stock and count
    if (
      updateProductDto.type === 'DECREASE' &&
      parseInt(product.count) < updateProductDto.amount
    )
      throw new HttpException('The amount entered is more than the stock', 400);

    // save prev amount for append to history
    const prev_amount = product.count;

    // Apply changes to the value count
    product.count =
      updateProductDto.type === 'INCREASE'
        ? (product.count + updateProductDto.amount).toString()
        : (parseInt(product.count) - updateProductDto.amount).toString();

    // save product changes in db
    await product.save();

    // create doc for history of change count
    const newHistory = await this.historyService.create({
      productId: product.id,
      type: updateProductDto.type,
      amount: updateProductDto.amount,
      prev_value: parseInt(prev_amount),
      current_value: parseInt(product.count),
    });

    // return successfuly message
    return `${updateProductDto.type} is Succesfully!`;
  }

  async deleteProduct(productId: string, shopId: string) {
    // find product from db
    let product = await this.productsModel.findById(productId);
    // check if product is not found or does belong to this shop
    this.isValidProduct(product, shopId);

    // remove product from db
    await product.deleteOne();
    return 'the product has been successfully removed';
  }

  private isValidProduct(product: any, shopId: string) {
    // if the product was invalid or did not belong to the user return error
    if (!product || product.shopId.toString() !== shopId)
      throw new HttpException('product is not available', 404);
    // if ok return true
    return true;
  }
}
