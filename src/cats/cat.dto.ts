export class CatDto {
    id: string | number | undefined;
    name: string;
    age: number;
    breed: string;
}

export class CreateCatDto {
    name: string;
    age: number;
    breed: string;
}