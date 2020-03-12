import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...');
        const start = Date.now();

        // next.handle()就是执行对应的方法
        // 不调用的话请求会挂起
        return next
            .handle()
            .pipe(tap(() => console.log(`After... ${Date.now() - start}ms`)));
    }
}
