import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ResponseSuccess } from '@utils/response-successful-controller';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post("login")
    async login(@Body() loginCredentialsDto: LoginCredentialsDto){
        const user = await this.authService.login(loginCredentialsDto)
        return new ResponseSuccess({data: user, message: "<--------------> Login Successfully <-------------------->"})
    }

    @Post("register")
    async register(@Body() createUserDto: CreateUserDto){
        await this.authService.createOne(createUserDto)
        return new ResponseSuccess({message: "<--------------------> Register Successfully <---------------->"})
    }
    
    @Post()
    async createNewRefreshToken(@Query('refreshToken')  refreshToken: string){
       const data = this.authService.routeRefreshToken(refreshToken)
       return new ResponseSuccess({data: data, message:"<--------------------> Create Successfully <---------------->" })
    }

    @Delete("logout")
    async logOut(@Body('refreshToken') refreshToken: string){
        await this.authService.removeToken(refreshToken)
        return new ResponseSuccess({message: "<--------------------> Logout Successfully <---------------->"})
    }
}

