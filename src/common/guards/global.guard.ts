import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (req.route.path.includes('auth')) {
      return true;
    }

    const token = req.headers?.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new NotFoundException('Token not found');
    }

    return true;
  }
}
