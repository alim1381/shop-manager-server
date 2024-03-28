import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // create a new product
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Req() req: any,
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    createProductDto.shopId = req.user.id;
    return this.productsService.create(createProductDto, image);
  }

  // get all product
  @Get()
  async allProducts(@Req() req: any) {
    return this.productsService.findAllProductsShop(req.user.id);
  }

  // update count product
  @Put(':id')
  async updateCount(
    @Req() req: any,
    @Body() updateProductDto: UpdateProductDto,
    @Param() params: { id: string },
  ) {
    updateProductDto.shopId = req.user.id;
    updateProductDto.productId = params.id;
    return this.productsService.updateCount(updateProductDto);
  }

  // get a product detailes
  @Get(':id')
  async oneProduct(@Req() req: any, @Param() param: { id: string }) {
    return this.productsService.findOneProduct(param.id, req.user.id);
  }

  // delete product
  @Delete(':id')
  async deleteProduct(@Req() req: any, @Param() param: { id: string }) {
    return this.productsService.deleteProduct(param.id, req.user.id);
  }
}
