import {  IsEmail, IsNotEmpty, Matches } from "class-validator"
import { REGEX_VALIDATE } from "src/utils/constant.utils"



export class CreateUserDto{

    @IsEmail({}, { message: "Please provide a valid email address." })
    @IsNotEmpty({ message: "Email is required." })
    email: string;

    @IsNotEmpty({ message: "Password is required." })
    @Matches(REGEX_VALIDATE.PASSWORD_REGEX, { message: "Password must contain at least one uppercase letter, one number, and one special character." })
    password: string;

    @IsNotEmpty({ message: "Full name is required." })
    name: string;

    role: string;
}