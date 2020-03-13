import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocsController } from './docs/docs.controller';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { DogsController } from './dogs/dogs.controller';
import { PigsController } from './pigs/pigs.controller';

@Module({
    imports: [CatsModule, CoreModule],
    // 将控制器加载到模块中，否则nest不会为控制器创建实例
    controllers: [AppController, DocsController, DogsController, PigsController],
    providers: [AppService],
})
export class AppModule implements NestModule{
    // 使用中间件，需要实现 NestModule 接口
    // nest的中间件有个特点：可以控制范围
    configure(consumer: MiddlewareConsumer) {
        // 按路由：支持通配符
        // consumer
        //     .apply(LoggerMiddleware)
        //     .forRoutes('cats')

        // 按控制器
        consumer
            .apply(LoggerMiddleware) // 可以放入多个中间件
            .forRoutes(DocsController)
    }
}
