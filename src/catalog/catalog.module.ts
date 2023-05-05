import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from 'src/books/book.entity';
import { BooksModule } from 'src/books/books.module';
import { ReviewEntity } from 'src/reviews/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, ReviewEntity]), BooksModule],
  providers: [CatalogService],
  controllers: [CatalogController]
})
export class CatalogModule {}
