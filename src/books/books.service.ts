import { Injectable } from '@nestjs/common';
import { BookEntity } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookInfoDto } from './dto/book-info.dto';
import { CreateBookDto } from './dto/create-book.dto';
import DuplicateError from 'src/errors/duplicate.error';
import { ReviewEntity } from 'src/reviews/review.entity';
import { ReviewInfoDto } from 'src/reviews/dto/review-info.dto';
import { ReviewsInfoDto } from 'src/reviews/dto/reviews-info.dto';
import NotFoundError from 'src/errors/not-found.error';
import OutOfStockError from 'src/errors/out-of-stock.error';


@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(BookEntity)
        private booksRepository: Repository<BookEntity>,
        @InjectRepository(ReviewEntity)
        private reviewsRepository: Repository<ReviewEntity>,
    ) {}

    async create(createBookDto: CreateBookDto): Promise<BookInfoDto> {
        const existingBook: BookEntity | null = await this.booksRepository.findOneBy({isbn: createBookDto.isbn});
        if(existingBook != null) {
            throw new DuplicateError(`книга с isbn ${createBookDto.isbn} уже существует!`);
        }
        console.log(JSON.stringify(createBookDto));
        let book: BookEntity = new BookEntity();
        book.annotation = createBookDto.annotation;
        book.ageRestrictions = createBookDto.ageRestrictions;
        book.author = createBookDto.author;
        book.inStock = createBookDto.inStock;
        book.isbn = createBookDto.isbn;
        book.name = createBookDto.name;
        book.pageCount = createBookDto.pageCount;
        book.price = createBookDto.price;
        book.imageByteArray = Buffer.from(createBookDto.imageByteArray);

        // console.log(JSON.stringify(book));
       
        const savedBook = await this.booksRepository.save(book);
        const bookInfo: BookInfoDto = BookInfoDto.map(savedBook);
        bookInfo.rating = 0;
        // bookInfo.rating = 0;
        return bookInfo;
    }

    async search(query: string) {
        const books = await this.booksRepository.createQueryBuilder("book_entity")
            .where("(book_entity.name like :query or book_entity.author like :query) and book_entity.inStock > 0", { query:`%${query}%` })
            .getMany();

        const booksInfo = await Promise.all(books.map(async book => { 
            const bookInfoDto = BookInfoDto.map(book);
            const rating = await this.getBookRating(book.id);
            bookInfoDto.rating = rating;
            return bookInfoDto;
        }));
        return booksInfo;
    }

    async preOrder(bookId: number) {
        const bookInfo = await this.findOneById(bookId);

        if(bookInfo.inStock == 0) {
            throw new OutOfStockError("выбранного товара нет в наличии!");
        }

        this.booksRepository.save({
            id: bookInfo.id,
            inStock: bookInfo.inStock - 1
        });
    }

    async findOneById(bookId: number): Promise<BookInfoDto> | null {
        const book: BookEntity | null = await this.booksRepository.findOneBy({id: bookId});
        if(book === null) {
            throw new NotFoundError(`книга с id ${bookId} не была найдена`);
        }

        let rating: number = await this.reviewsRepository.average("rating", { bookId });
        rating = rating === null ? 0 : Math.round(rating * 100) / 100;

        const bookInfo: BookInfoDto = BookInfoDto.map(book);
        bookInfo.rating = rating;

        return bookInfo;
    }

    async getBookRating(bookId: number): Promise<number> {
        let rating: number = await this.reviewsRepository.average("rating", { bookId });
        rating = rating === null ? 0 : Math.round(rating * 100) / 100;

        return rating;
    }

    async getAllReviewsById(bookId: number): Promise<ReviewsInfoDto> | null {
        await this.findOneById(bookId);
        
        const reviews: ReviewEntity[] | null = await this.reviewsRepository.findBy({bookId});
        // if(reviews === null) {
        //     throw new NotFoundError(`отзывы о книге с id ${bookId} не были найдены`);
        // }
        const reviewsInfo: ReviewsInfoDto = new ReviewsInfoDto();
        reviewsInfo.reviews = [];
        reviews.forEach(review => reviewsInfo.reviews.unshift(ReviewInfoDto.map(review)));

        const rating: number = await this.reviewsRepository.average("rating", { bookId });
        reviewsInfo.averageRating = Math.round(rating* 100) / 100;

        return reviewsInfo;
    }
}
