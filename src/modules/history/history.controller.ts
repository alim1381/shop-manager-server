import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async productHistory(@Req() req: any, @Param() params: { id: string }) {
    return this.historyService.productHistory(params.id, req.user.id);
  }
}
