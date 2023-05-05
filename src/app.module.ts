import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { RouterModule } from '@nestjs/core';
import { BookEntity } from './books/book.entity';
import { ReviewsController } from './reviews/reviews.controller';
import { ReviewsModule } from './reviews/reviews.module';
import { ReviewEntity } from './reviews/review.entity';
import { CatalogModule } from './catalog/catalog.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'sajkfskajdhd_daw',
            database: 'test',
            entities: [UserEntity, BookEntity, ReviewEntity],
            synchronize: true,
        }),
        UsersModule,
        AuthModule,
        BooksModule,
        ReviewsModule,
        CatalogModule,
        // RouterModule.register([
        //     {
        //         path: 'catalog',
        //         module: BooksModule, 
        //     },
        // ]),
    ],
    controllers: [ReviewsController],
})
export class AppModule { }
