import { Module } from '@nestjs/common';
import { UserGraphService } from './user-graph.service';
import { UserGraphResolver } from './user-graph.resolver';

@Module({
  providers: [UserGraphResolver, UserGraphService],
})
export class UserGraphModule {}
