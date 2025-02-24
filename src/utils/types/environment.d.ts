
export type Environment = {
    SECRET_KEY: string,
    EXPIRED_ACCESS_TOKEN: number,
    EXPIRED_REFRESH_TOKEN: number,
    TIME_LIMIT_REQUEST: string | null,
    LIMIT_REQUEST: string | null,
    ALGORITHM: string,
}