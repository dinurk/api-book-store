import { IsDateString, IsEmail, IsInt, IsString, Length, Max, Min } from "class-validator";

export class CreateReviewDto {

    @IsInt()
    @Max(5)
    @Min(0)
    rating: number;

    @IsString()
    @Length(10, 300)
    text: string;

    @IsInt()
    userId: number;
}