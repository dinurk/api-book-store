import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { ReviewEntity } from 'src/reviews/review.entity';
import { ReviewsModule } from 'src/reviews/reviews.module';

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity, ReviewEntity]), forwardRef(() => ReviewsModule)],
    providers: [BooksService],
    controllers: [BooksController],
    exports: [BooksService]
  })
export class BooksModule {}
