import { IsNotEmpty } from "class-validator";
import { User } from "src/user/entity/user.entity";


export class UserRequest{
  @IsNotEmpty({ message: 'User must be provided.' })
  user: User;

  constructor(user: User) {
    this.user = user;
  }
}