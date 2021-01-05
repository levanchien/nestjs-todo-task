import { IsDefined, IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsString()
    @Matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,64}$/,
        {
            message: 'Password is too weak. Please choose other. '
        }
    )
    password: string;

    @IsString()
    @IsDefined()
    @Matches(
        /^[a-zA-Z][a-zA-Z ]{0,63}$/,
        {
            message: 'First name is invalid'
        }
    )
    firstName: string;

    
    @IsString()
    @IsDefined()
    @Matches(
        /^[a-zA-Z][a-zA-Z ]{0,63}$/,
        {
            message: 'Last name is invalid'
        }
    )
    lastName: string;
}