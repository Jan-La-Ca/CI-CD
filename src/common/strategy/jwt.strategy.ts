import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { MESSAGES } from '@utils/constant.utils';
import { TSubjectToken } from '@utils/types/subject-token';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SECRET_KEY } from 'src/config/app.config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET_KEY,
    });
  }

  async validate(payload: TSubjectToken) {
    const user = await this.userService.findOne({ userId: payload.sub });
    if (!user) {
      throw new HttpException(MESSAGES.USER.NOT_FOUND, HttpStatus.UNAUTHORIZED);
    }
    return user; 
  }
}