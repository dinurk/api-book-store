import { BookEntity } from 'src/books/book.entity';
import { UserEntity } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class ReviewEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' })
    dateTime: Date;

    @Column('int', {default: 5})
    rating: number;

    @Column({ length: 100, default: "Отличный товар!" })
    text: string;

    @ManyToOne(type => UserEntity) @JoinColumn({name:"userId"})
    user: UserEntity;

    @Column('int')
    userId: number;

    @ManyToOne(type => BookEntity) @JoinColumn({name:"bookId"})
    book: BookEntity;

    @Column('int')
    bookId: number;
}
