import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import {
    UserInfoInterface,
    ReqWithUser,
} from 'src/middlewares/info.middleware';

export const User = createParamDecorator((data: string, req: ReqWithUser) => {
    console.log('data is', data); // 外界传来的data
    return req.user && data ? req.user[data] : req.user;
});
