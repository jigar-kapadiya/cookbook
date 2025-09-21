import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {  
  @Field(() => String, { description: 'Username' })
  @IsString()
  @IsNotEmpty()
  username: string

  @Field(() => String, { description: 'Display Name', nullable: true })
  @IsString()
  @IsOptional()
  displayName: string

  @Field(() => String, { description: "Email Id", })
  @IsEmail({}, { message: "Invalid email ID" })
  email: string

  @Field(() => String)
  @IsString({ message: "Invalid password" })
  @MinLength(10)
  password: string
}
