import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { SubController } from './sub/sub.controller';
import { CatsService } from './cats.service';
import { CoreModule } from 'src/core/core.module';

// 整体应用程序的某一个功能模块
@Module({
    controllers: [CatsController, SubController], // 本模块可用的controller
    providers: [CatsService], // 本模块可用的provider
    imports: [CoreModule]
})
export class CatsModule {

}
