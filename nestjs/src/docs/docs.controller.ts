import { Controller, Get, Redirect, Query, Post, HttpException, HttpStatus, Delete, UseFilters } from '@nestjs/common';
import { ForbiddenException } from './../exceptions/forbidden.exception'
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('docs')
export class DocsController {
    // 重定向路由
    @Get()
    @Redirect('https://docs.nestjs.com', 302) 
    getDocs(@Query('version') version: string) {
        // 覆盖默认行为，返回结构：
        // {
        //     url,
        //     statusCode
        // }
        if (version === 'v1') {
            return {
                url: 'https://docs.nestjs.com/v1',
                statusCode: 301
            }
        }
    }

    @Post()
    @UseFilters(HttpExceptionFilter)
    createDoc() {
        // 支持很多exception，HttpException是基础类
        // 在web开发中，抛出exception可被视为程序错误，要返回给前端可用信息
        throw new HttpException('You cant creare a doc', HttpStatus.FORBIDDEN)
    }

    @Delete()
    delDoc() {
        // 使用自定义的exception
        throw new ForbiddenException('You can not delete a doc')
    }
}
