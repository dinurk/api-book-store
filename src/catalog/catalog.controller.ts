import { Controller, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import NotFoundError from 'src/errors/not-found.error';
import ArgumentOutOfRangeError from 'src/errors/argument-out-of-range.error';
import { BooksService } from 'src/books/books.service';

@Controller('catalog')
export class CatalogController {

    constructor(
        private catalogService: CatalogService,
        private booksService: BooksService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Get('search') 
    async searchBook(
        @Query('query')
        query: string
    ) {
        return await this.booksService.search(query);
    }

    @Get('pages/:pageNumber') 
    async getPageByNumber( 
        @Query('orderBy')
        orderBy: string,
        @Param('pageNumber', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
        pageNumber: number
    ) {
        try {
            return await this.catalogService.getPage(pageNumber, orderBy);
        } catch (error: any) {
            if(error instanceof ArgumentOutOfRangeError) {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            }
            if(error instanceof NotFoundError) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw error;
        }
    }
}
