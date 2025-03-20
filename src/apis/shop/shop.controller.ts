import { Controller, Post } from '@nestjs/common';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  async postShop() {
    return this.shopService.postShop();
  }
}
