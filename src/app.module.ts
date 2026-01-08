import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ActorModule } from './actor/actor.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReviewModule } from './review/review.module';
import { SerialModule } from './serial/serial.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    MovieModule,
    ActorModule,
    ReviewModule,
    SerialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
