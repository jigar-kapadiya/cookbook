import { IsOptional, Length, IsUrl, IsString, IsNotEmpty } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { description: 'Id' })
  @IsString()
  @IsNotEmpty()
  id: string

  @Field({ nullable: true })
  @IsOptional()
  @Length(1, 50)
  displayName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(0, 280)
  bio?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}
