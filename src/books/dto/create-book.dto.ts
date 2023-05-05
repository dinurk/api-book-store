import { IsInt, IsString, Length, Max, Min } from "class-validator";

export class CreateBookDto {

    @IsString()
    @Length(2, 300)
    name: string;

    @IsString()
    @Length(2, 300)
    author: string;

    @IsInt()
    pageCount: number;

    @IsString()
    @Length(2, 3)
    ageRestrictions: string;

    @IsString()
    @Length(10, 20)
    isbn: string;

    @IsString()
    @Length(10, 300)
    annotation: string;

    @IsInt()
    @Max(100000)
    @Min(0)
    inStock: number;
}