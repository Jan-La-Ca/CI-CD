import { MESSAGES } from "src/utils/constant.utils";
import { InvalidUserInputException } from "./invalid-user-input.exception";

export class UserExistedException extends InvalidUserInputException{
    constructor(){
        super(MESSAGES.USER.USER_EXISTED)
    }
}