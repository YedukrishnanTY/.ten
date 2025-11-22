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
} from '@nestjs/common';
import { CurrenciesService } from 'src/service/currencies.service';

@Controller('Currencies')
export class UsersController {
    constructor(private readonly CurrenciesService: CurrenciesService) { }

    // GET /users/email/:email
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllCurrencies() {
        const currencies = await this.CurrenciesService.getAllCurrencies();
        return currencies;
    }

}
