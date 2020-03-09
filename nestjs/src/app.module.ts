import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { SubController } from './cats/sub/sub.controller';
import { DocsController } from './docs/docs.controller';

@Module({
  imports: [],
  // 将控制器加载到模块中，否则nest不会为控制器创建实例
  controllers: [AppController, CatsController, SubController, DocsController],
  providers: [AppService],
})
export class AppModule {}
