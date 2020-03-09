import { Controller, Get, Req, Headers, Post, Body, Header, Delete, Param } from '@nestjs/common';
import { Request } from 'express'

@Controller('cats')
export class CatsController {
    @Get()
    findAll(@Req() req: Request, @Headers() headers): string {
        // @Req() 装饰器可以拿到请求的所有细节
        // 它是express.req对象
        // 注意：正常情况不用直接拿全部的，一般使用专用的装饰器，例如 @Body
        console.log('body is', req.body)
        console.log('headers are', headers)
        return 'This action returns all cats'
    }

    @Post()
    @Header('Cache-Control', 'none') // 响应头
    create(@Body('name') name): string {
        console.log('body.name is', name)
        return `create a cat named ${name} success`
    }

    // 路由参数
    // 它是和name搭配使用
    // 注意：@Query 是拼接在URL上的参数
    @Delete(':id')
    async del(@Param('id') name): Promise<{success: boolean}> {
        console.log(`delete the cat named ${name}`)
        return {
            success: true
        }
    }
}
