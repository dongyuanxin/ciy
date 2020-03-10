import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocsController } from './docs/docs.controller';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CatsModule, CoreModule],
  // 将控制器加载到模块中，否则nest不会为控制器创建实例
  controllers: [AppController, DocsController],
  providers: [AppService],
})
export class AppModule {}
