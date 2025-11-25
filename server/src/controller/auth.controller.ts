import {
    Body,
    Controller,
    Get,
    Res,
    Post,
    NotFoundException,
    HttpCode,
    HttpStatus,
    HttpException,
    Headers,
    UseGuards,
    Req
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Auth } from "../schemas/auth.schemas";
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { TokenService } from '../service/token.services';

@Controller('users')
export class AuthController {
    constructor(private readonly AuthService: AuthService,
        private readonly jwtService: JwtService,
        private readonly tokenService: TokenService
    ) { }

    // POST /users/register
    @Post('/register')
    @Post('/register')
    async create(@Body() User: Auth, @Req() req: Request) {

        // Check existing user
        const existing = await this.AuthService.findUserByUserName(User.name);
        if (existing) {
            throw new HttpException(
                { statusCode: 400, message: 'Email already in use' },
                HttpStatus.BAD_REQUEST
            );
        }

        if (!User.currency) {
            throw new HttpException(
                { statusCode: 400, message: 'Please select a currency' },
                HttpStatus.BAD_REQUEST
            );
        }

        function normalizeIp(rawIp: string | undefined | null): string | null {
            if (!rawIp) return null;
            const first = rawIp.split(',')[0].trim();
            return first.replace(/^::ffff:/, '');
        }
        function getClientIp(req: any): string | null {
            const forwarded = (req.headers && (req.headers['x-forwarded-for'] || req.headers['X-Forwarded-For'])) as string | undefined;
            if (forwarded) return normalizeIp(forwarded);

            const raw = req.raw || req; 
            const socketAddr = raw?.socket?.remoteAddress || raw?.connection?.remoteAddress || raw?.remoteAddress;
            return normalizeIp(socketAddr);
        }
        const ip = getClientIp(req) || '';

        console.log(ip, 'ip')

        const userAgent = req.headers['user-agent'];

        const user = await this.AuthService.createUser({
            ...User,
            ip: ip,
            userAgent,
        });

        const { password, ...safe } = user.toObject ? user.toObject() : user;
        return safe;
    }



    // GET /users/get-profile-details

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('/get-profile-details')
    @HttpCode(HttpStatus.OK)
    async findByEmail(@Headers() headers: Record<string, any>,) {
        const username = this.tokenService.getUsernameFromHeaders(headers);
        const user = await this.AuthService.findUserByUserName(username);
        if (!user) throw new HttpException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'failed to fetch the profile',
        }, HttpStatus.BAD_REQUEST
        );

        const { password, ...safe } = user.toObject ? user.toObject() : user;
        return safe;
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: { name: string; password: string },
        @Res({ passthrough: true }) reply: any) {
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
        const payload = {
            sub: user._id,
            name: user.name,
            role: Array.isArray(user.role) ? user.role.map(r => String(r).toUpperCase()) : [],
        };
        const token = this.jwtService.sign(payload);


        reply.header('set-cookie', token);
        return {
            user: safe,
            token,
        };
    }

}
