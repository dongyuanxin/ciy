import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

export interface UserInfoInterface {
    name: string;
    age: number;
}

export interface ReqWithUser extends Request {
    user: UserInfoInterface;
}

@Injectable()
export class InfoMiddleware implements NestMiddleware {
    use(req: ReqWithUser, res: any, next: () => void) {
        req.user = {
            name: 'dongyuanxin',
            age: 22,
        };
        next();
    }
}

export function infoMiddleware(req: ReqWithUser, res: any, next: () => void) {
    req.user = {
        name: 'dongyuanxin', // 假设这里是验证后，得到了用户身份
        age: 22,
    };
    next();
}
