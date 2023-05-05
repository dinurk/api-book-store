import { Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import NotFoundError from 'src/errors/not-found.error';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    
    @Get(':id') 
    async findOne( 
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
        id: number) {
        try {
            return await this.usersService.findOneById(id);
        } catch (error: any) {
            if(error instanceof NotFoundError) {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            }
            throw error;
        }
    }

    // @Post('auth/sign-up')
    // async create(@Body() createUserDto: CreateUserDto) {
    //     try {
    //         return await this.usersService.create(createUserDto);
    //     } catch (error: any) {
    //         if(error instanceof DuplicateError) {
    //             throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    //         }
    //         throw error;
    //     }
    // }
}
