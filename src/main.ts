import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExaptionsFilter } from './common/filters/all-exaptions.filters';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { Logger } from './common/middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(Logger);
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExaptionsFilter('AllExaptionsFilter'));

  const config = new DocumentBuilder()
    .setTitle('Tea-nest')
    .setDescription('The Tea-nest API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
