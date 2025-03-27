import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApisModule } from './apis/apis.module';
import { AuthModule } from './apis/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    ApisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
