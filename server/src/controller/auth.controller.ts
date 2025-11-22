import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    ConflictException,
    NotFoundException,
    HttpCode,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import { AuthService } from 'src/service/auth.service';
import { Auth } from "src/schemas/auth.schemas";
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class AuthController {
    constructor(private readonly AuthService: AuthService,
        private jwtService: JwtService) { }

    // POST /users
    @Post('/register')
    async create(@Body() User: Auth) {
        // check existing
        const existing = await this.AuthService.findUserByUserName(User.name);
        if (existing) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Email already in use',
                },
                HttpStatus.BAD_REQUEST
            );
        }
        if (!User.currency) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Please select a currency',
                },
                HttpStatus.BAD_REQUEST
            );
        }
        const user = await this.AuthService.createUser(User);
        const { password, ...safe } = user.toObject ? user.toObject() : user;
        return safe;
    }

    // GET /users/:name
    @Get('/:name')
    @HttpCode(HttpStatus.OK)
    async findByEmail(@Param('name') name: string) {
        const user = await this.AuthService.findUserByUserName(name);
        if (!user) throw new NotFoundException('User not found');
        const { password, ...safe } = user.toObject ? user.toObject() : user;
        return safe;
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: { name: string; password: string }) {
        const { name, password } = body;
        const user = await this.AuthService.loginUser(name, password);
        if (!user) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.UNAUTHORIZED,
                    message: 'Invalid credentials',
                },
                HttpStatus.UNAUTHORIZED
            );
        }
        const { password: pwd, ...safe } = user.toObject ? user.toObject() : user;
        const payload = { sub: user._id, name: user.name };
        const token = this.jwtService.sign(payload);
        return {
            user: safe,
            token,
        };
    }

}
