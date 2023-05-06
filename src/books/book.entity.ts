import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100 })
    author: string;

    @Column()
    pageCount: number;

    @Column({ length: 3 }) 
    ageRestrictions: string;

    @Column({ unique: true, length: 14 })
    isbn: string;

    @Column({ length: 1200 })
    annotation: string;

    @Column('int') 
    inStock: number;

    @Column('decimal', { precision: 6, scale: 2 }) 
    price: number;

    @Column('varbinary', {length:7200})
    imageByteArray: Buffer;

    // @Column('int', {default: 0})
    // numberOfRatings: number;

    // @Column('decimal', { precision: 6, scale: 2, default: 0.0 })
    // rating: number;
}