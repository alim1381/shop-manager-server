import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ShopService } from './shop.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}
}
