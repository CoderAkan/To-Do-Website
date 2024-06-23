import { IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class CreateTaskDto {
    @IsNotEmpty()
    title: string

    @IsOptional()
    description?: string = ''

    @IsNotEmpty()
    isChecked: boolean

    @IsNotEmpty()
    @IsNumber()
    categoryId: number
    
    @IsOptional()
    @IsNumber()
    userId?: number
}
