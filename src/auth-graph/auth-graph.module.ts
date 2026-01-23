import { Module } from '@nestjs/common';
import { AuthGraphService } from './auth-graph.service';
import { AuthGraphResolver } from './auth-graph.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  providers: [AuthGraphResolver, AuthGraphService],
})
export class AuthGraphModule {}
