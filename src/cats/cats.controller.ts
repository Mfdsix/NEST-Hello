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
import { CatDto } from './cat.dto';
import { Response } from 'express';

const cats : CatDto[] = [
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
  findAll(): CatDto[] {
    return cats
  }

  @Get('async')
  async findAllAsync(): Promise<CatDto[]> {
    return cats;
  }

  @Post()
  create(@Body() body: CatDto, @Res({ passthrough: true }) res: Response): string {
    res.status(HttpStatus.CREATED);
    return "success";
  }

  @Get(':id')
  findOne(@Param() params: any): CatDto {
    return {
        ...cats[0],
        id: params.id
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: CatDto, @Res() res: Response) {
    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Res() res: Response) {
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
