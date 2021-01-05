import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const result = this.validateRequest(request);
    if (!result) {
      throw new UnauthorizedException();
    }
    return result;
  }

  private validateRequest(request): boolean {
    return request.isAuthenticated();
  }
}