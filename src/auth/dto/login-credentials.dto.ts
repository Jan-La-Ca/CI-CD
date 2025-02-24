import { Contains, IsEmail, IsNotEmpty } from "class-validator"

export class LoginCredentialsDto{
    @IsEmail()
    @Contains("")
    @IsNotEmpty()
    email: string

    @Contains("")
    @IsNotEmpty()
    password: string
}