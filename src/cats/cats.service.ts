import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    findAll(): Cat[] {
        return this.cats;
    }

    findOne(id: string): Cat {
        return this.cats.find((cat) => cat.id == id);
    }

    create(cat: Cat){
        this.cats.push({
            ...cat,
            id: new Date().getTime()
        });
    }

    update(id: string, cat: Cat){
        const selectedIndex = this.cats.findIndex((cat) => cat.id == id)
        this.cats[selectedIndex] = {
            ...this.cats[selectedIndex],
            ...cat
        }
    }

    delete(id: string){
        const selectedIndex = this.cats.findIndex((cat) => cat.id == id)
        this.cats.splice(selectedIndex, 1);
    }
}
