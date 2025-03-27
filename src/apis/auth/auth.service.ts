import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { ROLE } from 'src/common/constants/enum';
import { Shop } from 'src/entities/shop.entity';
import { Repository } from 'typeorm';

type JwtPayload = {
  sub: string;
  name: string;
  roles: ROLE;
};

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  async validate(data: { email: string; password: string }): Promise<any> {
    try {
      const shop = await this.shopRepository.findOneBy({ email: data.email });
      if (!shop) throw new UnauthorizedException('Tài khoản không đúng');

      const comparePassword = await bcrypt.compareSync(
        data.password,
        shop.password,
      );

      if (!comparePassword)
        throw new UnauthorizedException('Tài khoản không đúng');

      const { password, ...result } = shop;
      return result;
    } catch (error) {
      this.logger.error(`Event form validate shop: ${error}`);
      throw new UnauthorizedException('Xác thực thất bại');
    }
  }

  async getTokens(payLoad: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payLoad, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRETKEY'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES'),
      }),
      this.jwtService.signAsync(payLoad, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRETKEY'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(
    email: string,
    pass: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const shop = await this.shopRepository.findOne({
      where: {
        email,
      },
    });
    if (!shop) {
      throw new NotFoundException('Không thấy người dùng');
    }
    const payload = { sub: shop.email, name: shop.name, roles: shop.roles };
    return this.getTokens(payload);
  }
}
