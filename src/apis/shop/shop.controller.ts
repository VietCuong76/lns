import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { ResponseItem } from 'src/common/dtos/responseItem';
import { CreateShopDTO } from './dto/request.dto';
import { ResCreateShopDTO } from './dto/response.dto';
import { ShopService } from './shop.service';
import { JwtAccessTokenGuard } from '../auth/guards/accessToken.guard';

@Controller('shop')
@UseGuards(JwtAccessTokenGuard)
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  async postShop(
    @Body() body: CreateShopDTO,
  ): Promise<ResponseItem<ResCreateShopDTO>> {
    return this.shopService.postShop(body);
  }

  @Get()
  async getAllShop() {
    return this.shopService.getShop();
  }
}
