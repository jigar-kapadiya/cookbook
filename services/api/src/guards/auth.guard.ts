import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

export interface JwtUser {
  sub: string; username: string; iat?: number; exp?: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const auth: string | undefined = req.headers?.authorization;

    if (!auth?.startsWith('Bearer ')) throw new UnauthorizedException('Missing token');
    const token = auth.slice(7);

    try {
      const payload = this.jwt.verify<JwtUser>(token, { secret: process.env.JWT_SECRET! });
      req.user = payload; // attach for resolvers/decorators
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
