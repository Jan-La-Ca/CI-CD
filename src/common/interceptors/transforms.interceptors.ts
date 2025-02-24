import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { TSuccessResponse } from "@utils/types/success-response";
import { getTime } from "date-fns";
import { map, Observable } from "rxjs";

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, TSuccessResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<TSuccessResponse<T>> {
    return next.handle().pipe(map(response => {
        const status = context.switchToHttp().getResponse().statusCode
        const {metadata, data, message} = response
        return {
            status: status,
            timestamp: getTime(new Date()),
            message: message,
            data: data,
            metadata: metadata
        }
    }));
  }
}