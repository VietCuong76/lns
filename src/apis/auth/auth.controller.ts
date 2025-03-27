import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.login(body.email, body.password);
  }
}
