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
  Res,
} from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { Response } from 'express';
import { FilterCatDto } from './filter-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  findAll(@Query() query: FilterCatDto): Cat[] {
    return this.catsService.findAll();
  }

  @Get('async')
  async findAllAsync(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Post()
  create(@Body() body: CreateCatDto, @Res({ passthrough: true }) res: Response): string {
    this.catsService.create(body);

    res.status(HttpStatus.CREATED);
    return "success";
  }

  @Get(':id')
  findOne(@Param() params: any): Cat {
    return this.catsService.findOne(params.id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: CreateCatDto, @Res() res: Response) {
    this.catsService.update(id, body);

    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Res() res: Response) {
    this.catsService.delete(id);

    res.status(HttpStatus.NO_CONTENT).send();
  }
}
