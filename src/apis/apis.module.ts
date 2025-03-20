import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ReqContextMiddleware } from 'src/common/middleware/reqcontext.middleware';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [ShopModule],
})
export class ApisModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReqContextMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
