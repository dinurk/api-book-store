import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import DuplicateError from 'src/errors/duplicate.error';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
    constructor(private reviewsService: ReviewsService) {}

    // @Post() 
    // async create(@Body() createReviewDto: CreateReviewDto) {
    //     try {
    //         return await this.reviewsService.create(createReviewDto);
    //     } catch (error: any) {
    //         if(error instanceof DuplicateError) {
    //             throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    //         }
    //         throw error;
    //     }
    // }
}
