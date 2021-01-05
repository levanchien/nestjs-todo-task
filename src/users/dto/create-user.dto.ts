import { IsDefined, IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsString()
    @MaxLength(32)
    @MinLength(8)
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,64}$/)
    password: string;

    @IsString()
    @MaxLength(64)
    @MinLength(1)
    @Matches(/^[a-zA-Z][a-zA-Z ]{0,63}$/)
    @IsDefined()
    firstName: string;

    
    @IsString()
    @MaxLength(64)
    @MinLength(1)
    @Matches(/^[a-zA-Z][a-zA-Z ]{0,63}$/)
    @IsDefined()
    lastName: string;
}