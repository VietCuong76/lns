import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Shop } from 'src/entities/shop.entity';
import { ShopModule } from '../shop/shop.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strateges/accessToken.strategy';
import { LocalStrategy } from './strateges/local.strategy';
import { RefreshTokenStrategy } from './strateges/refreshToken.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ConfigService,
  ],
  imports: [
    ShopModule,
    PassportModule,
    TypeOrmModule.forFeature([Shop]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_SECRETKEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRES'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
