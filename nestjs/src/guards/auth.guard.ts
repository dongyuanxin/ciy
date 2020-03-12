import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Optional,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector?: Reflector) {}

    canActivate(
        context: ExecutionContext, // 执行上下文，继承自ArgumentsHost
    ): boolean | Promise<boolean> | Observable<boolean> {
        const pwd = this.reflector.get<string[]>('pwd', context.getHandler());
        if (!pwd.length) {
            return true;
        }

        const httpCtx = context.switchToHttp();
        const req = httpCtx.getRequest<Request>();

        return req.body.pwd === pwd[0];
    }
}
