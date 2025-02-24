import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class ServiceGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const account = request.user;
    if (account) {
      return true;
    }
    return false;
  }
}


// @Injectable()
// export class RolesGuard implements CanActivate{
//     constructor(private reflector: Reflector){}
//     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//         const roles = this.reflector.get()
//     }
// }

