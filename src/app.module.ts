import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ApisModule } from './apis/apis.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CommonModule, ApisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
