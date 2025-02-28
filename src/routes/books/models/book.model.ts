import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'book' })
export class BookModel {
  @Field(() => ID)
  id: string;

  @Field()
  isbn: string;

  @Field()
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
