import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UtilModule } from './util/util.module';

// 模块导出
@Module({
    imports: [CommonModule, UtilModule], // 导入外部模块，内部使用
    exports: [CommonModule, UtilModule] // 可以导出本模块的service / 内部模块
})
export class CoreModule {}
