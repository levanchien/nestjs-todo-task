import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsString()
    @MaxLength(8)
    @MinLength(32)
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,64}$/)
    password: string;

    @IsString()
    @MaxLength(64)
    @MinLength(1)
    @Matches(/^[a-zA-Z][a-zA-Z ]{0,63}$/)
    firstName: string;

    
    @IsString()
    @MaxLength(64)
    @MinLength(1)
    @Matches(/^[a-zA-Z][a-zA-Z ]{0,63}$/)
    lastName: string;
}