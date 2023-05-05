import { BookInfoDto } from "src/books/dto/book-info.dto";

export class PageDto {
    pageNumber: number;
    pagesCount: number;
    books: BookInfoDto[];
}