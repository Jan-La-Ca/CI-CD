import { InvalidUserInputException } from "./invalid-user-input.exception";



export class InvalidTokenException extends InvalidUserInputException{
    constructor(){
        super("Invalid Token")
    }
}