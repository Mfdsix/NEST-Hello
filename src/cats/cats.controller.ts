import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res
} from '@nestjs/common';
import { CreateCatDto, createCatSchema } from './dto/create-cat.zod.dto';
import { Response } from 'express';
import { FilterCatDto } from './dto/filter-cat.dto';
import { CatDto } from './dto/cat.dto';
import { CatsService } from './cats.service';
import { ValidationPipe } from '../validation.pipe';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll(@Query() query: FilterCatDto): CatDto[] {
    return this.catsService.findAll();
  }

  @Get('async')
  async findAllAsync(): Promise<CatDto[]> {
    const datas = await this.catsService.findAll();
    return datas;
  }

  @Post()
  async create(
    @Body(new ValidationPipe(createCatSchema)) body: CreateCatDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<string> {
    await this.catsService.create(body);

    res.status(HttpStatus.CREATED);
    return 'success';
  }

  @Get(':id')
  async findOne(@Param() params: any): Promise<CatDto> {
    const data = await this.catsService.findOne(params.id);
    return data;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe(createCatSchema)) body: CreateCatDto,
    @Res() res: Response,
  ) {
    await this.catsService.findOne(id);
    await this.catsService.update(id, body);

    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.catsService.findOne(id);
    await this.catsService.delete(id);

    res.status(HttpStatus.NO_CONTENT).send();
  }
}
