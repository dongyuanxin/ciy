import { Controller, Post, Body, UsePipes, Param } from '@nestjs/common';
import { Dog, DogSchema } from './dogs.interface';
import { MyTransfromPipe } from 'src/pipes/my-transfrom.pipe';
import { MyValidationPipe } from 'src/pipes/my-validation.pipe';

// 管道的两种作用：
// 1. 数据验证
// 2. 数据转换

// 可以绑定到controller，或者方法上

@Controller('dogs')
export class DogsController {
    @Post()
    // @UsePipes(MyTransfromPipe)
    @UsePipes(new MyValidationPipe(DogSchema))
    async createDog(@Body() dog: Dog, @Param() params) {
        console.log('after transform, dog is', dog);
        return true;
    }
}
