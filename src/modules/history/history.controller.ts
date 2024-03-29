import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('history')
@ApiTags('History')
@ApiBearerAuth("Authorization")
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    example: '6607295942cdf83f9d48c1a2',
    description: 'product id',
  })
  async productHistory(@Req() req: any, @Param() params: { id: string }) {
    return this.historyService.productHistory(params.id, req.user.id);
  }
}
