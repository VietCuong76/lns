import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAccessTokenGuard extends AuthGuard('jwt-refresh-token') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { headers } = context.switchToHttp().getRequest();
    const { authorization } = headers;

    if (!authorization) {
      throw new UnauthorizedException('Tài khoản không đúng');
    }

    const token = authorization.replace('Bearer ', '');

    try {
      this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRETKEY'),
      });
    } catch (error) {
      throw new UnauthorizedException('Tài khoản không đúng');
    }

    return true;
  }
}
