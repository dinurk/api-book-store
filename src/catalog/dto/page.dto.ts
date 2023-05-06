import { BookAsCatalogItemDto } from "src/books/dto/book-as-catalog-item.dto";

export class PageDto {
    pageNumber: number;
    pagesCount: number;
    books: BookAsCatalogItemDto[];
}