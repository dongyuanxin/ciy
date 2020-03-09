import { Controller, Get } from '@nestjs/common';

// 关于路由拼接：在@Controller、@Get等方法中都可以
// 参考：https://stackoverflow.com/questions/50438986/how-to-create-nested-routes-with-parameters-using-nestjs
@Controller('cats/sub')
export class SubController {
    @Get()
    getSubInfo() {
        return 'The route is "/cats/get", method is GET'
    }
}
