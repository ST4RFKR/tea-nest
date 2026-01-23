import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { GraphQLModule } from '@nestjs/graphql';
import { getGraphqlConfig } from './config/graphql.config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserGraphModule } from './user-graph/user-graph.module';
import { AuthGraphModule } from './auth-graph/auth-graph.module';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: getGraphqlConfig,
      inject: [ConfigService],
    }),
    PrismaModule,
    AuthModule,
    AuthGraphModule,
    UserGraphModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
