import { Controller, Get, Redirect, Query } from '@nestjs/common';

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
}
