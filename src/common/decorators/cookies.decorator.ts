import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CookieParser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
  }
);