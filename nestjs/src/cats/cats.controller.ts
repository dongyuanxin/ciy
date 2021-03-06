import { Controller, Get, Req, Headers, Post, Body, Header, Delete, Param, Inject, Optional } from '@nestjs/common';
import { Request } from 'express'
import { CatsService } from './cats.service';
import { Cat } from './cats.interface';
import { UtilService } from 'src/core/util/util.service';

@Controller('cats')
export class CatsController {
    // 我喜欢的方式：
    // 基于属性进行依赖注入
    // 用于继承时，子类不用多次调用super
    @Inject()
    private readonly catsService: CatsService

    // 这里utilService只有当 CoreModule 是@Global()装饰的全局模块
    // 或者被本模块引入后才可以
    // nest通过这种约定控制了模块之间的引用关系
    // 当没有正确引入 CoreModule时候，UtilService为“空”。添加Optional才能保证编译不出错
    @Inject()
    @Optional()
    private readonly utilService: UtilService

    // 推荐：通过构造函数直接进行依赖注入
    // constructor(
    //     // 可选的，当依赖注入对象不存在时，不会报错
    //     @Optional() private readonly catsService: CatsService
    // ) {}

    @Get()
    async findAll(@Req() req: Request, @Headers() headers): Promise<Cat[]> {
        // @Req() 装饰器可以拿到请求的所有细节
        // 它是express.req对象
        // 注意：正常情况不用直接拿全部的，一般使用专用的装饰器，例如 @Body
        this.utilService.console('body is ' + req.body, 'warn')
        console.log('headers are', headers)
        return await this.catsService.findAll()
    }

    @Post()
    @Header('Cache-Control', 'none') // 响应头
    async create(@Body() body: Cat): Promise<boolean> {
        console.log('body.name is', body.name)
        await this.catsService.create(body)
        return true
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
