import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { BooksService } from './books.service';
import { NewBookInput } from './dto/new-book.input';
import { BookModel } from './models/book.model';

const pubSub = new PubSub();

@Resolver(() => BookModel)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => BookModel)
  // async book(@Args('id') id: string): Promise<Book> {
  //   const book = await this.booksService.findOneById(id);
  //   if (!book) {
  //     throw new NotFoundException(id);
  //   }
  //   return book;
  // }

  // @Query((returns) => [Book])
  // books(@Args() booksArgs: BooksArgs): Promise<Book[]> {
  //   return this.booksService.findAll(booksArgs);
  // }
  @Mutation(() => BookModel)
  async addBook(
    @Args('newBookData') newBookData: NewBookInput,
  ): Promise<BookModel> {
    const book = await this.booksService.create(newBookData);
    pubSub.publish('recipeAdded', { recipeAdded: book });
    return book;
  }

  // @Mutation((returns) => Boolean)
  // async removeBook(@Args('id') id: string) {
  //   return this.booksService.remove(id);
  // }

  // @Subscription((returns) => Book)
  // recipeAdded() {
  //   return pubSub.asyncIterableIterator('recipeAdded');
  // }
}
