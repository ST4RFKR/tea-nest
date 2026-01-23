import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => String)
  email: string;
}
