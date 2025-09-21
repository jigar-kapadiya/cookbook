import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID) id: string;
  @Field() email: string;
  @Field() username: string;
  @Field({ nullable: true }) displayName?: string;
  @Field({ nullable: true }) bio?: string;
  @Field({ nullable: true }) avatarUrl?: string;
  @Field() createdAt: Date;
  @Field() updatedAt: Date;
}
