import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { Response } from 'express';

const cats = [
  {
    id: 1,
    name: 'My Cat',
    age: 20,
    breed: 'asian',
  },
];

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Res() res: Response) {
    res.json(cats);
  }

  @Get('async')
  async findAllAsync(@Res() res: Response) {
    res.json(cats);
  }

  @Post()
  create(@Body() body: CreateCatDto, @Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get(':id')
  findOne(@Param() params: any, @Res() res: Response) {
    res.json({
        ...cats[0],
        id: params.id
    })
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: CreateCatDto, @Res() res: Response) {
    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Res() res: Response) {
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
