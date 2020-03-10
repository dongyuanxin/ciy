import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response, Request } from 'express'

// 异常过滤器：专门用于覆盖默认的处理异常的行为
// 它的特点是：可以作用于全局、指定控制器、module、或者constoller的方法上

// @Catch指定处理的异常
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    // host充分体现了元编程的概念，可以获取上下文、可以获得传递给函数的参数
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const res = ctx.getResponse<Response>()
        const req = ctx.getRequest<Request>()

        res
            .status(exception.getStatus())
            .json({
                statusCode: exception.getStatus(),
                timestamp: (new Date()).toISOString(),
                path: req.url,
                msg: exception.getResponse()
            })
    }
}
