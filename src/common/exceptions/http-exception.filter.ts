import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import {  Response } from "express";
import { MESSAGES } from "src/utils/constant.utils";
import { IErrorResponse,IHttpResponseException } from "@utils/types/error-response";
import { getTime } from "date-fns";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const timestamp = getTime(new Date())

    // Default response structure
    const json: IHttpResponseException = { status: HttpStatus.INTERNAL_SERVER_ERROR, timestamp: timestamp,message: MESSAGES.GLOBAL };


    // Handle Prisma exceptions
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      json.message = 'Something went wrong, please try again';
      json.status = HttpStatus.BAD_REQUEST; // You can choose an appropriate status here
    }

    // Handle BadRequestException
    if (exception instanceof BadRequestException) {
      const data = exception.getResponse() as IErrorResponse;
      json.status = data.statusCode;
      json.message = data.message;
    }

    // Handle HttpException
    if (exception instanceof HttpException) {
      json.status = exception.getStatus();
      json.message = exception.message;
    }


    // Log final error response before sending it
    Logger.error(`FilterException:: ${json.status} - ${json.message}`);

    // Send response
    response.status(json.status).json(json);
  }
}