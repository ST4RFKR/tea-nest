import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Res, ValidationPipe } from '@nestjs/common';
import { Logger } from './common/middlewares/logger.middleware';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExaptionsFilter } from './common/filters/all-exaptions.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(Logger);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExaptionsFilter('AllExaptionsFilter'));

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
