import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
type User = {
  id: string;

  email: string;
  password: string;
  name: string;

  createrAt: Date;
  updateAt: Date;
};

export const Authorized = (): any =>
  createParamDecorator((data: any, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    const user = req.user;

    return data ? user![data] : user;
  });
