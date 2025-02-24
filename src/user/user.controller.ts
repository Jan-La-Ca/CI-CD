import {  Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserRequest } from '@utils/types/user-request';
import { Request } from 'express';
import { UserService } from './user.service';
import { ServiceGuard } from 'src/common/guards/auth.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { ResponseSuccess } from '@utils/response-successful-controller';
import { omit } from 'lodash';

@Controller('user')
@UseGuards(JwtAuthGuard, ServiceGuard)
export class UserController {

  constructor(private readonly userService: UserService){}
   
    @Get()
    async getProfile(@Req() request: UserRequest & Request){
      const user = request.user
      const account = await this.userService.findOne({userId: user.id })
      const accountWithoutPassword = omit(account,"password")
      return new ResponseSuccess({data: accountWithoutPassword, message: "<----------> Get profile <----------->"})
    }
}
