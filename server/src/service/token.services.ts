import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) { }

    getUsernameFromHeaders(headers: Record<string, any>): string {
        const token = headers?.['authorization']?.split(' ')?.[1];
        if (!token) {
            throw new HttpException(
                { statusCode: HttpStatus.UNAUTHORIZED, message: 'No token provided' },
                HttpStatus.UNAUTHORIZED,
            );
        }

        let decoded: any;
        try {
            decoded = this.jwtService.verify(token);
        } catch (err) {
            throw new HttpException(
                { statusCode: HttpStatus.UNAUTHORIZED, message: 'Invalid token' },
                HttpStatus.UNAUTHORIZED,
            );
        }

        const username = decoded.name ;
        if (!username) {
            throw new HttpException(
                { statusCode: HttpStatus.BAD_REQUEST, message: 'Username not found in token' },
                HttpStatus.BAD_REQUEST,
            );
        }

        return username;
    }
}