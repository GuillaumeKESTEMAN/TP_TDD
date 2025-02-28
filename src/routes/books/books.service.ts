import { Injectable } from '@nestjs/common';
import type { Book } from 'src/entities/book.entity';
import { BooksRepository } from './books.repository';
import type { NewBookInput } from './dto/new-book.input';
import { BookModel } from './models/book.model';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  private toBookModel(book: Book): BookModel {
    const bookModel = new BookModel();
    bookModel.id = book.id;
    bookModel.isbn = book.isbn;
    return bookModel;
  }

  async create(data: NewBookInput): Promise<BookModel> {
    const book = await this.booksRepository.addBook(data);
    return this.toBookModel(book);
  }

  // async findOneById(id: string): Promise<Book> {
  //   return {} as any;
  // }

  // async findAll(booksArgs: BooksArgs): Promise<Book[]> {
  //   return [] as Book[];
  // }

  // async remove(id: string): Promise<boolean> {
  //   return true;
  // }
}
