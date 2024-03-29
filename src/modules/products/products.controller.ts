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
import { SaleProductDto } from './dto/sale-product.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';

@Controller('products')
@UseGuards(JwtAuthGuard)
@ApiTags('products')
@ApiBearerAuth('Authorization')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // create a new product
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiProperty({ description: 'Create new Post' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: "Book" },
        discription: { type: 'string', example: "a book for programming learning" },
        count: { example: 3 },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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
  @ApiProperty({ description: 'get all products' })
  async allProducts(@Req() req: any) {
    return this.productsService.findAllProductsShop(req.user.id);
  }

  // update count product
  @Put()
  @ApiProperty({ description: 'Update count filde' })
  async updateCount(
    @Req() req: any,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    updateProductDto.shopId = req.user.id;
    return this.productsService.updateCount(updateProductDto);
  }

  // update count product
  @Put('sale')
  async saleProducts(@Req() req: any, @Body() saleProductDto: SaleProductDto) {
    return this.productsService.saleProducts(saleProductDto, req.user.id);
  }

  // get a product detailes
  @Get(':id')
  @ApiParam({
    name: 'id',
    example: '6606090185dbb148a4d9c645',
    description: 'product id',
  })
  async oneProduct(@Req() req: any, @Param() param: { id: string }) {
    return this.productsService.findOneProduct(param.id, req.user.id);
  }

  // delete product
  @Delete(':id')
  @ApiParam({
    name: 'id',
    example: '6606090185dbb148a4d9c645',
    description: 'product id',
  })
  async deleteProduct(@Req() req: any, @Param() param: { id: string }) {
    return this.productsService.deleteProduct(param.id, req.user.id);
  }
}
