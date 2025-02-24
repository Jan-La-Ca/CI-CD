import { HttpException, HttpStatus } from "@nestjs/common";
import { MESSAGES } from "src/utils/constant.utils";

export class InvalidUserInputException extends HttpException{
    constructor(message:string = MESSAGES.USER.NOT_FOUND){
        super(message, HttpStatus.BAD_REQUEST)
    }
}