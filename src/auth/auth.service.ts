
import {  Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { UserService } from 'src/user/user.service';
import { InvalidUserPassword } from './exceptions/invalid-user-password.exception';
import { Role, Status } from '@prisma/client';
import { UserWithoutPassword } from './entities/user-without-password.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ResponseTokenDto } from './dto/response-token.dto';
import { JwtService } from '@nestjs/jwt';
import { UserExistedException } from './exceptions/user-is-existed.exception';
import { InvalidUserInputException } from './exceptions/invalid-user-input.exception';
import { CryptoService } from 'src/crypto/crypto.service';
import { Environment } from '@utils/types/environment';
import { TSubjectToken } from '@utils/types/subject-token';
import { InvalidTokenException } from './exceptions/invalid-token.exception';
import { omit } from 'lodash';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService, private readonly userService: UserService, private readonly jwtService: JwtService, private readonly cryptoService: CryptoService,@Inject("ENV") private readonly env: Environment) { }
    
    async createOne(user: CreateUserDto): Promise<UserWithoutPassword> {
        const userData = await this.userService.findOne({email: user.email})
        if(userData){
          throw new UserExistedException()
        }
        const passwordHashed = await this.cryptoService.encodeBcrypt(user.password)
        const newUser = await this.prismaService.users.create({
            data: { ...user, password: passwordHashed, role: Role.USER, status: Status.ACTIVE }
        })
        return omit(newUser, "password")
    }

    async login({ email, password }: LoginCredentialsDto): Promise<ResponseTokenDto> {
        const user = await this.userService.findOne({ email })
        if (!user) {
            throw new InvalidUserInputException()
        }
        const isCheckPassword = await this.cryptoService.comparePassword(password, user.password)
        if (!isCheckPassword) {
            throw new InvalidUserPassword()
        }
        const payload = { sub: user.id, role: user.role, email: user.email }
        const {accessToken, exp, refreshToken} = await this.generateTokensForUser(payload)
        return {accessToken: accessToken, expired: exp, refreshToken: refreshToken}
    }
    
    async removeToken(refreshToken: string) {
        const dataFromRefreshToken = await this.findUserByRefreshToken(refreshToken)
        if(!dataFromRefreshToken){
            throw new InvalidTokenException()
        }
        return await this.prismaService.tokens.deleteMany({
            where: { refreshToken: refreshToken }
        });
    }

    async routeRefreshToken(refreshToken: string){
        const subject = await this.verifyToken(refreshToken)
        const {accessToken, exp, refreshToken: newRefreshToken} = await this.generateTokensForUser({sub: subject.sub, email: subject.email, role: subject.role})
        return {accessToken: accessToken, expired: exp, refreshToken: newRefreshToken}
    }

    private async createAccessToken(payload: { sub: number, email: string, role: Role }): Promise<string> {
        return this.jwtService.sign(payload, { expiresIn: this.env.EXPIRED_ACCESS_TOKEN, secret: this.env.SECRET_KEY })
    }

    private async createRefreshToken(payload: { sub: number, email: string, role: Role }): Promise<string> {
        return this.jwtService.sign(payload, { expiresIn: this.env.EXPIRED_REFRESH_TOKEN, secret: this.env.SECRET_KEY })
    }

    private async generateTokensForUser(payload: {
        sub: number;
        role: Role;
        email: string;
    }){
        const accessToken = await this.createAccessToken(payload)
        const {exp} = await this.verifyToken(accessToken)
        const refreshToken = await this.createRefreshToken(payload)
        await this.updateRefreshToken({id: payload.sub, refreshToken })
        return { accessToken, exp, refreshToken }
    }

    async verifyToken(token: string): Promise<TSubjectToken>{
         return await this.jwtService.verify(token,{secret: this.env.SECRET_KEY})
    }

    private async updateRefreshToken({id,refreshToken}: {id: number, refreshToken: string}){
        return await this.prismaService.tokens.upsert({
            where: {userId: id},
            create: {userId: id, refreshToken: refreshToken},
            update: {id: id, refreshToken: refreshToken}
        })
    }

    
    private async findUserByRefreshToken(refreshToken: string){
        return await this.prismaService.tokens.findFirst({
            where: {refreshToken: refreshToken}
        })
    }
}
