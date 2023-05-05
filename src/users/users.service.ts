import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import DuplicateError from 'src/errors/duplicate.error';
import NotFoundError from 'src/errors/not-found.error';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    async create(email: string, password: string): Promise<UserInfoDto> {
        const existingUser: UserEntity | null = await this.usersRepository.findOneBy({email});
        if(existingUser != null) {
            throw new DuplicateError(`user with email ${email} already exists!`);
        }

        const user = new UserEntity();
        user.email = email;
        user.password = password;
        const savedUser = await this.usersRepository.save(user);

        const userInfo = new UserInfoDto();
        userInfo.id = savedUser.id;
        userInfo.email = savedUser.email;

        return userInfo;
    }

    async findOneById(userId: number): Promise<UserInfoDto> | null {
        const user: UserEntity | null = await this.usersRepository.findOneBy({id: userId});
        if(user === null) {
            throw new NotFoundError(`пользователь с id ${userId} не был найден`);
        }
        const userInfo = new UserInfoDto();
        userInfo.email = user.email;
        userInfo.id = user.id;
        return userInfo;
    }

    async findOneByEmail(email: string): Promise<UserEntity> | null {
        const user: UserEntity | null = await this.usersRepository.findOneBy({email});
        if(user === null) {
            throw new NotFoundError(`пользователь с почтой ${email} не был найден`);
        }
        return user;
    }
}
