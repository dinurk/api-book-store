import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in-dto';
import NotFoundError from 'src/errors/not-found.error';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import DuplicateError from 'src/errors/duplicate.error';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDto) {
        try {
            return await this.authService.signIn(signInDto.email, signInDto.password);
        } catch(error) {
            if(error instanceof UnauthorizedException) {
                throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
            }
            if(error instanceof NotFoundError) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw error;
        }
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('sign-up')
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            return await this.authService.signUp(createUserDto.email, createUserDto.password);
        } catch (error: any) {
            if(error instanceof DuplicateError) {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
            }
            throw error;
        }
    }
}
