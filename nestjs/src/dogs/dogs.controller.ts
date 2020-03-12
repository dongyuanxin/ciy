import {
    Controller,
    Post,
    Body,
    UsePipes,
    Param,
    UseGuards,
    Delete,
    SetMetadata,
    Put,
    UseInterceptors,
} from '@nestjs/common';
import { Dog, DogSchema } from './dogs.interface';
import { MyTransfromPipe } from 'src/pipes/my-transfrom.pipe';
import { MyValidationPipe } from 'src/pipes/my-validation.pipe';
import { AuthGuard } from 'src/guards/auth.guard';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

// 管道的两种作用：
// 1. 数据验证
// 2. 数据转换

// 管道：可以绑定到controller，或者方法上

// 守卫的角色：它强调在正确的地方，以声明式的方式插入验证逻辑。
// 相较于中间件，中间件可能是全局的验证，而守卫可以用于全局、控制器、方法上（和路由、业务关联程度更强）
// 同时，守卫也可以利用元编程

// 拦截器
// 专门用于AOP
// 1. 处理函数外的逻辑
// 2. 转换函数结果/异常
// 3. 扩展函数功能

@Controller('dogs')
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard)
export class DogsController {
    @Post()
    // @UsePipes(MyTransfromPipe)
    @UsePipes(new MyValidationPipe(DogSchema))
    async createDog(@Body() dog: Dog, @Param() params) {
        console.log('after transform, dog is', dog);
        return true;
    }

    @Put()
    @SetMetadata('pwd', ['123']) // 元数据
    async deleteDog() {
        return true;
    }
}
