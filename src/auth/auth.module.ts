import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/strategy/jwt.strategy';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { CryptoModule } from 'src/crypto/crypto.module';
import { ConfigModule } from 'src/config/config.module';



@Module({
  providers: [AuthService,JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  imports: [PrismaModule, UserModule, JwtModule.register({}), CryptoModule, ConfigModule]
})
export class AuthModule { }
