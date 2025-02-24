export interface IErrorResponse {
    message: { property: string; value: string; constraints: unknown }[];
    error: string;
    statusCode: number;
  }


export interface IHttpResponseException{
    status?: number,
    timestamp: number;
    message?: string | { property: string; value: string; constraints: unknown }[],
}