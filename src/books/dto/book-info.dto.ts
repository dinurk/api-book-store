import { BookEntity } from "../book.entity";

export class BookInfoDto {
    id: number;
    name: string;
    author: string;
    pageCount: number;
    ageRestrictions: string;
    isbn: string;
    annotation: string;
    price: number;
    inStock: number;
    rating: number;
    imageByteArray: number[];

    static map(book: BookEntity): BookInfoDto {
        let bookInfoDto = new BookInfoDto();
        bookInfoDto.id = book.id;
        bookInfoDto.name = book.name;
        bookInfoDto.author = book.author;
        bookInfoDto.pageCount = book.pageCount;
        bookInfoDto.ageRestrictions = book.ageRestrictions;
        bookInfoDto.isbn = book.isbn;
        bookInfoDto.price = book.price;
        bookInfoDto.annotation = book.annotation;
        bookInfoDto.inStock = book.inStock;
        bookInfoDto.imageByteArray = book.imageByteArray.toJSON().data; 
        return bookInfoDto;
    }
}