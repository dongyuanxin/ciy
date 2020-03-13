import { Controller, Post, SetMetadata } from '@nestjs/common';
import { User } from 'src/decorators/user';

const Roles = (roles: string[]) => SetMetadata('roles', roles);

@Controller('pigs')
export class PigsController {
    // 自定义参数装饰器
    @Post()
    // 自定义普通装饰器
    @Roles(['abc'])
    createPig(@User('name') name: string) {
        console.log('usr.name is', name);
        return true;
    }
}
