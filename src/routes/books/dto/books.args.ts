import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class BooksArgs {

  @Field(() => Int, {nullable:true})
  @Min(1)
  @Max(50)
  limit = 25;
}