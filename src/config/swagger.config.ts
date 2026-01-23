import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Tea-nest')
    .setDescription('The Tea-nest API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
}
