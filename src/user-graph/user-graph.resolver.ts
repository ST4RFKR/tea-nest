import { Resolver } from '@nestjs/graphql';
import { UserGraphService } from './user-graph.service';
import { Query } from '@nestjs/graphql';
import { User } from './models/user.model';

@Resolver()
export class UserGraphResolver {
  constructor(private readonly userGraphService: UserGraphService) {}

  @Query(() => [User])
  findAll() {
    return this.userGraphService.findAll();
  }
}
