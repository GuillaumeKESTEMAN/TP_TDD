import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: number;

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
}
