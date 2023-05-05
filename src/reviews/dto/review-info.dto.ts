import { IsDateString, IsEmail, IsInt, IsString, Length, Max, Min } from "class-validator";
import { ReviewEntity } from "../review.entity";

export class ReviewInfoDto {
    id: number;
    dateTime: string;
    rating: number;
    text: string;
    userId: number;

    static map(reviewEntity: ReviewEntity): ReviewInfoDto {
        let reviewInfoDto: ReviewInfoDto = new ReviewInfoDto();
        reviewInfoDto.dateTime = reviewEntity.dateTime.toISOString();
        reviewInfoDto.rating = reviewEntity.rating;
        reviewInfoDto.text = reviewEntity.text;
        reviewInfoDto.userId = reviewEntity.userId;

        return reviewInfoDto;
    }
}