import { IsIn, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateTaskDto {
    @IsNotEmpty()
    @IsOptional()
    title: string;
    
    @IsNotEmpty()
    @IsOptional()
    description: string;

    @IsNotEmpty()
    @IsOptional()
    @IsIn([1, 2, 3])
    status: number;
}