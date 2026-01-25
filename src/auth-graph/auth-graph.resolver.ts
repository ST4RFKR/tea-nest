import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGraphService } from './auth-graph.service';
import type { Request, Response } from 'express';
import type { GqlContext } from 'common/interfaces/gql-context';
import { AuthModel } from './models/auth.model';
import { RegisterInput } from './inputs/register.input';
import { LoginInput } from './inputs/login.input';

@Resolver()
export class AuthGraphResolver {
  constructor(private readonly authGraphService: AuthGraphService) {}

  @Mutation(() => AuthModel)
  register(@Context() context: GqlContext, @Args('data') input: RegisterInput) {
    return this.authGraphService.register(context.res, input);
  }

  @Mutation(() => AuthModel)
  login(@Context() context: GqlContext, @Args('data') input: LoginInput) {
    return this.authGraphService.login(context.res, input);
  }

  @Mutation(() => AuthModel)
  refresh(@Context() context: GqlContext) {
    return this.authGraphService.refresh(context.req, context.res);
  }

  @Mutation(() => Boolean)
  logout(@Context() context: GqlContext) {
    return this.authGraphService.logout(context.res);
  }
}
