import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express'

// 中间件：实现 NestMiddleware 接口
// 它的位置是：介于client和controller之间的链路上的某个节点

// 可以执行任何代码，对请求和响应对象进行更改
// 可以提前终止响应周期，或者调用其他中间件
// 使用next()来进入下一个中间件，否则请求将被挂起

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        console.log(
            `At ${(new Date()).toLocaleTimeString()}: ${req.url}`
        )
        next();
    }
}
