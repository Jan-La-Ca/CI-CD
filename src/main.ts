import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { INestApplication, Logger } from '@nestjs/common'
import { ValidationPipe } from './common/validator/validation.pipe';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function appMiddleware(app: INestApplication<any>){
  


  // Middleware for validating
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })
  
  return app
}



async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  await appMiddleware(app)

  await app.listen(process.env.PORT ?? 3000)

  Logger.log(`Server is running ${process.env.PORT ?? 3000} .............`)
}
bootstrap()
