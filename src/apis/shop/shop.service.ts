import {
  BadRequestException,
  Injectable,
  Logger
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { ROLE } from 'src/common/constants/enum';
import { ResponseItem } from 'src/common/dtos/responseItem';
import { Shop } from 'src/entities/shop.entity';
import { CreateShopDTO } from './dto/request.dto';
import { ResCreateShopDTO } from './dto/response.dto';

@Injectable()
export class ShopService {
  private readonly logger = new Logger(ShopService.name);

  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    // private authService: AuthService,
  ) {}
  async postShop(
    postDTO: CreateShopDTO,
  ): Promise<ResponseItem<ResCreateShopDTO>> {
    try {
      const checkEmail = await this.shopRepository.findOneBy({
        email: postDTO.email,
      });
      if (checkEmail) {
        throw new BadRequestException('Email đã tồn tại');
      }

      const shop = new Shop();
      shop.name = postDTO.name;
      shop.email = postDTO.email;
      shop.password = await bcrypt.hash(postDTO.password, 10);
      shop.roles = postDTO.roles || ROLE.USER;

      const data = this.shopRepository.create(shop);
      await this.shopRepository.save(data);

      return new ResponseItem(data, 'CREATED_SUCCESSFULLY');
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getShop() {
    try {
      const data = this.shopRepository.find();
      throw new BadRequestException();
      // return new ResponsePaginator(data, 'LIST_ALL_SHOP');
    } catch (error) {
      this.logger.error('error');
    }
  }
}
