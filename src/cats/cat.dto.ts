import { IsNotEmpty } from "class-validator";

export class CatDto {
    id: string | number | undefined;
    name: string;
    age: number;
    breed: string;
}

export class CreateCatDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    age: number;

    @IsNotEmpty()
    breed: string;
}