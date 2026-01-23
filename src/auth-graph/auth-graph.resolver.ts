import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGraphService } from './auth-graph.service';
import type { Request, Response } from 'express';
import type { GqlContext } from 'common/interfaces/gql-context';
import { AuthModel } from './models/auth.model';
import { RegisterInput } from './inputs/register.input';

@Resolver()
export class AuthGraphResolver {
  constructor(private readonly authGraphService: AuthGraphService) {}

  @Mutation(() => AuthModel)
  register(@Context() context: GqlContext, @Args('data') input: RegisterInput) {
    return this.authGraphService.register(context.res, input);
  }
}
