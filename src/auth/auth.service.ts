
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, password: string): Promise<any> {
        const existingUser = await this.usersService.findOneByEmail(email);
        if (existingUser == null) {
            throw new UnauthorizedException(`Пользователь с почтой ${email} не был найден`);
        }

        if (password !== existingUser.password) {
            throw new UnauthorizedException(`Введен неверный пароль`);
        }

        const payload = { username: email, id: existingUser.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(email: string, password: string): Promise<any> {
        return await this.usersService.create(email, password);
    }
}

