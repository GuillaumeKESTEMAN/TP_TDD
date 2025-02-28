import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateScalar } from '../../common/scalars/date.scalar';
import { Book } from '../../entities/book.entity';
import { BooksRepository } from './books.repository';
import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BooksResolver, BooksService, BooksRepository, DateScalar],
})
export class BooksModule {}
