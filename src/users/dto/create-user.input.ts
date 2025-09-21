import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Name' })
  @IsString()
  @IsNotEmpty()
  name: string

  @Field(() => String, { description: "Email Id", })
  @IsEmail({}, { message: "Invalid email ID" })
  email: string
}
