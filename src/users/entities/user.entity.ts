import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'Id' })
  id: number
  
  @Field(() => String, { description: 'Name' })
  name: string

  @Field(() => String, { description: "Email Id" })
  email: string
}
