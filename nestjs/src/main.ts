import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { infoMiddleware } from './middlewares/info.middleware';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(infoMiddleware);
    await app.listen(3000);
}
bootstrap();
