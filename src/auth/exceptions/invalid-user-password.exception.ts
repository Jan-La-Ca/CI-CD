import { InvalidUserInputException } from "./invalid-user-input.exception";

export class InvalidUserPassword extends InvalidUserInputException{
    constructor(){
        super("Invalid-user-password")
    }
}