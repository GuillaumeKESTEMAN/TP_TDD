import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../../entities/book.entity';
import type { NewBookInput } from './dto/new-book.input';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  async addBook({
    isbn,
    title,
    author,
    publisher,
    publishedDate,
    pageCount,
    description,
    genres,
  }: NewBookInput): Promise<Book> {
    const newBook = new Book(
      isbn,
      title,
      author,
      publisher,
      publishedDate,
      pageCount,
      description,
      genres,
    );
    return await this.booksRepository.save(newBook);
  }
}
