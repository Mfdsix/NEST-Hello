import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { NotFoundException } from 'src/not-found-exception.filter';

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    findAll(): Cat[] {
        return this.cats;
    }

    findOne(id: string): Cat {
        const cat = this.cats.find((cat) => cat.id == id);
        if(!cat) throw new NotFoundException();

        return cat;
    }

    create(cat: Cat){
        this.cats.push({
            ...cat,
            id: new Date().getTime()
        });
    }

    update(id: string, cat: Cat){
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
