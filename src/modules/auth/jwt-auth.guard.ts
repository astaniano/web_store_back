import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { TokenService } from '../token/token.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'not authorized' });
      }

      this.tokenService.validateToken(token, process.env.JWT_ACCESS_SECRET);

      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'not authorized' });
    }
  }
}
