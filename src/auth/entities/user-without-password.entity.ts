import { OmitType } from "@nestjs/swagger";
import { User } from "src/user/entity/user.entity";

export class UserWithoutPassword extends OmitType(User,["password"] as const){}
