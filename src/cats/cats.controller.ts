import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';

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

    @Post()
    @HttpCode(201)
    create(@Body() body: CreateCatDto): string {
        return 'Test POST Cat';
    }

    @Get(':id')
    findOne(@Param() params: any): string {
        return 'Test GET Cat with ID ' + params.id;
    }

    @Put(':id')
    @HttpCode(204)
    update(@Param('id') id: string, @Body() body: CreateCatDto) {}

    @Delete(':id')
    @HttpCode(204)
    delete(@Param('id') id: string) {}
}