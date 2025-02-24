import { env } from "process";



// JSON TOKEN WEB
export const SECRET_KEY = env.SECRET_KEY
export const EXPIRED_ACCESS_TOKEN = env.EXPIRED_ACCESS_TOKEN
export const EXPIRED_REFRESH_TOKEN = env.EXPIRED_REFRESH_TOKEN



// RATE_LIMIT_REQUEST
export const TIME_LIMIT_REQUEST = 60
export const LIMIT_REQUEST = 1

// CRYPTO
export const ALGORITHM = env.ALGORITHM



const appConfig  = () => {
    return{
        SECRET_KEY: env.SECRET_KEY,
        EXPIRED_ACCESS_TOKEN: env.EXPIRED_ACCESS_TOKEN,
        EXPIRED_REFRESH_TOKEN: env.EXPIRED_REFRESH_TOKEN,
        TIME_LIMIT_REQUEST: null,
        LIMIT_REQUEST: null,
        ALGORITHM: process.env.ALGORITHM,
    }
}


export default appConfig