import {  MiddlewareConsumer, Module } from '@nestjs/common'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/exceptions/http-exception.filter';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { TransformInterceptor } from './common/interceptors/transforms.interceptors';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { CryptoModule } from './crypto/crypto.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      load: [appConfig],
    }),
    UserModule,
    AuthModule,
    PrismaModule,
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 120, limit: 5 }],
    }),
    CryptoModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
