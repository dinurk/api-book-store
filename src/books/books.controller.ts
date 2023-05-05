import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import DuplicateError from 'src/errors/duplicate.error';
import { CreateReviewDto } from 'src/reviews/dto/create-review.dto';
import { ReviewsService } from 'src/reviews/reviews.service';
import NotFoundError from 'src/errors/not-found.error';
import OutOfStockError from 'src/errors/out-of-stock.error';

@Controller('books')
export class BooksController {
    constructor(
        private booksService: BooksService,
        private reviewsService: ReviewsService
    ) {}

    @Get(':id') 
    async findOneById( 
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
        id: number) {
        try {
            return await this.booksService.findOneById(id);
        } catch (error: any) {
            if(error instanceof NotFoundError) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw error;
        }
    }

    @Get(':id/reviews') 
    async getAllReviews( 
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
        bookId: number
    ) {
        try {
            return await this.booksService.getAllReviewsById(bookId);
        } catch (error: any) {
            if(error instanceof NotFoundError) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw error;
        }
    }

    @Post(':id/reviews') 
    async createReview(
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
        bookId: number,
        @Body() createReviewDto: CreateReviewDto
    ) {
        try {
            return await this.reviewsService.create(createReviewDto, bookId);
        } catch (error: any) {  
            if(error.constructor.name === "NotFoundError") {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            if(error instanceof DuplicateError) {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            }
            throw error;
        }
    }

    // @HttpCode(HttpStatus.OK)
    // @Get('search/:query') 
    // async searchBook(
    //     @Param('query')
    //     query: string
    // ) {
    //     return await this.booksService.search(query);
    // }

    @HttpCode(HttpStatus.OK)
    @Post(':id/preorder') 
    async preorderBook(
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
        bookId: number
    ) {
        try {
            return await this.booksService.preOrder(bookId);
        } catch (error: any) {  
            if(error.constructor.name === "NotFoundError") {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            if(error instanceof OutOfStockError) {
                throw new HttpException(error.message, HttpStatus.OK);
            }
            throw error;
        }
    }

    @Post() 
    async create(@Body() createBookDto: CreateBookDto) {
        try {
            return await this.booksService.create(createBookDto);
        } catch (error: any) {
            if(error instanceof DuplicateError) {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            }
            throw error;
        }
    }
}
