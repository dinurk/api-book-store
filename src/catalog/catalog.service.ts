import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/books/book.entity';
import NotFoundError from 'src/errors/not-found.error';
import { Repository } from 'typeorm';
import { PageDto } from './dto/page.dto';
import { BookInfoDto } from 'src/books/dto/book-info.dto';
import ArgumentOutOfRangeError from 'src/errors/argument-out-of-range.error';
import { ReviewEntity } from 'src/reviews/review.entity';
import { BookAsCatalogItemDto } from 'src/books/dto/book-as-catalog-item.dto';

@Injectable()
export class CatalogService {

    constructor(
        @InjectRepository(BookEntity)
        private booksRepository: Repository<BookEntity>,
        @InjectRepository(ReviewEntity)
        private reviewsRepository: Repository<ReviewEntity>
    ) {}

    async getPage(pageNumber: number): Promise<PageDto> | null {
        
        const BOOKS_PER_PAGE = 10;

        if(pageNumber < 1) {
            throw new ArgumentOutOfRangeError(`получено некорректное значение номера страницы: ${pageNumber}`);
        }

        pageNumber = pageNumber - 1;

        const books: BookEntity[] = await this.booksRepository
                                                .createQueryBuilder("book_entity")
                                                .orderBy("price")
                                                .skip(pageNumber * BOOKS_PER_PAGE)
                                                .take(BOOKS_PER_PAGE)
                                                .getMany();
        
        if(books.length === 0) {
            throw new NotFoundError(`страницы каталога с номером ${pageNumber + 1} не существует!`);
        }

        const allBooksCount = await this.booksRepository.count();
        let pagesCount = Math.ceil(allBooksCount / BOOKS_PER_PAGE);

        pagesCount = pagesCount === 0 ? 1 : pagesCount;

        const page: PageDto = new PageDto();
        page.books = await Promise.all(books.map(async book => {
            let tmp = BookAsCatalogItemDto.map(book);
            tmp.rating = await this.reviewsRepository.average("rating", { bookId: book.id });
            tmp.rating = tmp.rating === null ? 0 : Math.round(tmp.rating * 100) / 100;
            return tmp;
        }));
        page.pageNumber = pageNumber + 1;
        page.pagesCount = pagesCount;

        return page;
    }
}
