import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { Auth, AuthSchema } from './schemas/auth.schemas';
import { ConfigModule } from '@nestjs/config';
import { CurrenciesController } from './controller/currencies.controller';
import { CurrenciesService } from './service/currencies.service';
import { Currencies, CurrenciesSchema } from './schemas/currencies.schemas';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

require('dotenv').config();

const uri = process.env.DATABASE_URL || '';

@Module({
  imports: [
    MongooseModule.forRoot(uri),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    MongooseModule.forFeature([{ name: Currencies.name, schema: CurrenciesSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || '',
      signOptions: { expiresIn: '365d' }, // token expiry
    }),
  ],
  controllers: [AuthController, CurrenciesController],
  providers: [AuthService, CurrenciesService, JwtStrategy],
  exports: [AuthService],
})
export class AppModule { }
