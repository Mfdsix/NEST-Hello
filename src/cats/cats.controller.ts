import { Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
    @Get()
    findAll(): string {
        return 'Test GET Cat';
    }

    @Get('async')
    async findAllAsync(): Promise<string> {
        return 'Test GET Cat using Async';
    }

    @Get(':id')
    findOne(@Param() params: any): string {
        return 'Test GET Cat with ID ' + params.id;
    }

    @Post()
    @HttpCode(201)
    create(): string {
        return 'Test POST Cat';
    }
}