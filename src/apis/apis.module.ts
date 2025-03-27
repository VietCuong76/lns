import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { GlobalGuard } from 'src/common/guards/global.guard';
import { ReqContextMiddleware } from 'src/common/middleware/reqcontext.middleware';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [ShopModule, AuthModule],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: GlobalGuard,
    },
  ],
})
export class ApisModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReqContextMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
