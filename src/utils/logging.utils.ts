import { Injectable, LoggerService, Scope } from "@nestjs/common";
import { formatDateToString } from "./date-time.utils";



@Injectable({scope: Scope.TRANSIENT})
export class Logger implements LoggerService{
    log(message: unknown) {
       console.log(`${formatDateToString(new Date())}:, ${message}`)
    }
    error(message: unknown) {
        console.error(`${formatDateToString(new Date())}:, ${message}`)
    }
    warn(message: unknown) {
        console.warn(`${formatDateToString(new Date())}:, ${message}`)
    }
    debug?(message: unknown) {
        console.debug(`${formatDateToString(new Date())}:, ${message}`)
    }
}