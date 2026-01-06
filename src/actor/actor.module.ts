import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ActorController],
  providers: [ActorService],
})
export class ActorModule {}
