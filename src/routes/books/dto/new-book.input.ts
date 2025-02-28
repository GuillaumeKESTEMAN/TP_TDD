import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewBookInput {
  @Field()
  @MaxLength(30)
  isbn: string;

  @Field()
  @MaxLength(50)
  title: string;

  @Field()
  author: string;

  @Field()
  publisher: string;

  @Field()
  publishedDate: string;

  @Field()
  pageCount: number;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String])
  genres: string[];
}
