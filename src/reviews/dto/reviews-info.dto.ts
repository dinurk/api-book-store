import { ReviewInfoDto } from "./review-info.dto";

export class ReviewsInfoDto {
    averageRating: number;
    reviews: ReviewInfoDto[];
}