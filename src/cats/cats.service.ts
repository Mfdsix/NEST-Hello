import { Injectable } from '@nestjs/common';
import { CatDto } from './dto/cat.dto';
import { NotFoundException } from 'src/not-found-exception.filter';

@Injectable()
export class CatsService {
    private readonly cats: CatDto[] = [];

    findAll(): CatDto[] {
        return this.cats;
    }

    findOne(id: string): CatDto {
        const cat = this.cats.find((cat) => cat.id == id);
        if(!cat) throw new NotFoundException();

        return cat;
    }

    create(cat: CatDto){
        this.cats.push({
            ...cat,
            id: new Date().getTime()
        });
    }

    update(id: string, cat: CatDto){
        const selectedIndex = this.cats.findIndex((cat) => cat.id == id)
        if(selectedIndex == -1) throw new NotFoundException();

        this.cats[selectedIndex] = {
            ...this.cats[selectedIndex],
            ...cat
        }
    }

    delete(id: string){
        const selectedIndex = this.cats.findIndex((cat) => cat.id == id)
        if(selectedIndex == -1) throw new NotFoundException();

        this.cats.splice(selectedIndex, 1);
    }
}
