import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { User, UserSchema } from './schemas/user.schemas';
import { ConfigModule } from '@nestjs/config';
import { CurrenciesController } from './controller/currencies.controller';
import { CurrenciesService } from './service/currencies.service';
import { Currencies, CurrenciesSchema } from './schemas/currencies.schemas';

require('dotenv').config();

const uri = process.env.DATABASE_URL || '';

@Module({
  imports: [
    MongooseModule.forRoot(uri),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Currencies.name, schema: CurrenciesSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [UsersController, CurrenciesController],
  providers: [UserService, CurrenciesService],
})
export class AppModule { }
