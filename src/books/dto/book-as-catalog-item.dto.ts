import { BookEntity } from "../book.entity";

export class BookAsCatalogItemDto {
    id: number;
    name: string;
    author: string;
    inStock: number;
    rating: number;
    price: number;
    imageByteArray: number[];

    static map(book: BookEntity): BookAsCatalogItemDto {
        let bookAsCatalogItemDto = new BookAsCatalogItemDto();
        bookAsCatalogItemDto.id = book.id;
        bookAsCatalogItemDto.name = book.name;
        bookAsCatalogItemDto.author = book.author;
        bookAsCatalogItemDto.inStock = book.inStock;
        bookAsCatalogItemDto.price = book.price;
        // bookAsCatalogItemDto.imageByteArray = book.imageByteArray.toJSON().data; 
        return bookAsCatalogItemDto;
    }
}