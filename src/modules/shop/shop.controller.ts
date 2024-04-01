import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ShopService } from './shop.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get('statistics')
  @UseGuards(JwtAuthGuard)
  async statistics(@Req() req: any) {
    return this.shopService.getShopStatistics(req.user.id);
  }
}
