import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function getTypeOrmConfig(
  configService: ConfigService,
): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: configService.getOrThrow('POSTRGES_HOST'),
    port: configService.getOrThrow('POSTRGES_PORT'),
    username: configService.getOrThrow('POSTRGES_USER'),
    password: configService.getOrThrow('POSTRGES_PASSWORD'),
    database: configService.getOrThrow('POSTRGES_DATABASE'),
    autoLoadEntities: true,
    synchronize: true,
  };
}
