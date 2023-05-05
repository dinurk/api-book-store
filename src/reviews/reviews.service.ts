import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewEntity } from './review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import DuplicateError from 'src/errors/duplicate.error';
import { ReviewInfoDto } from './dto/review-info.dto';
import { UserEntity } from 'src/users/user.entity';
import NotFoundError from 'src/errors/not-found.error';
import { UsersService } from 'src/users/users.service';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(ReviewEntity)
        private reviewsRepository: Repository<ReviewEntity>,
        private usersService: UsersService,
        private booksService: BooksService
    ) {}

    async create(createReviewDto: CreateReviewDto, bookId: number): Promise<ReviewInfoDto> {
        try {
            await this.usersService.findOneById(createReviewDto.userId);
            await this.booksService.findOneById(bookId);
        } catch(error){
            throw error;
        }
        
        const existingReview: ReviewEntity | null = await this.reviewsRepository.findOneBy({ 
            userId: createReviewDto.userId, 
            bookId
        });

        if(existingReview != null) {
            throw new DuplicateError(`отзыв для книги с id ${bookId} от пользователя с id ${createReviewDto.userId} уже существует!`);
        }

        const review: ReviewEntity = Object.assign(new ReviewEntity(), createReviewDto); 
        review.dateTime = new Date(Date.now());
        review.bookId = bookId;

        const savedReview = await this.reviewsRepository.save(review);

        const reviewInfo = new ReviewInfoDto();
        reviewInfo.id = savedReview.id;

        return reviewInfo;
    }
}
