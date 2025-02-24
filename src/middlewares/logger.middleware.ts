import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import pinoHttp from 'pino-http';
import { getTime } from 'date-fns';
import { toInteger } from 'lodash';
import { UserRequest } from '@utils/types/user-request';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request & UserRequest, res: Response, next: NextFunction) {
    const httpLogger = pinoHttp({
      base: null,
      timestamp: false,
      redact: {
        paths: ["req", "res"],
        remove: true,
      },
      customProps: (req: Request & UserRequest, res) => {
        const user = (req?.user as unknown as User)?.email || "Guest";
        return {
          user: user, 
          method: req.method, 
          path: req.url,
          agent: req.headers['user-agent'], 
          ip: req.headers['x-forwarded-for'], 
          status: res.statusCode,
          response_time: toInteger(res.getHeader('X-Response-Time') || 0),
          timestamp: getTime(new Date()),
        }
      },
      stream: {
        write: (msg) => {
          console.log("LoggingMiddlewareService::", JSON.parse(msg));
        },
      },
    });

    httpLogger(req, res, next); 
  }
}