import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: object, user, info) {
        if (err || !user) {
            throw new UnauthorizedException('Invalid or Missing Token');
        }
        return user; // attaches to request.user
    }

}
