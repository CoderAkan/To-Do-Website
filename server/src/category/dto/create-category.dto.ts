import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    title: string
}
