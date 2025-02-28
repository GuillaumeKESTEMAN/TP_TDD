import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  isbn: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publisher: string;

  @Column()
  publishedDate: string;

  @Column()
  pageCount: number;

  @Column({ nullable: true })
  description?: string;

  @Column('simple-array')
  genres: string[];

  constructor(
    isbn: string,
    title: string,
    author: string,
    publisher: string,
    publishedDate: string,
    pageCount: number,
    description: string,
    genres: string[],
  ) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.publishedDate = publishedDate;
    this.pageCount = pageCount;
    this.description = description;
    this.genres = genres;
  }
}
