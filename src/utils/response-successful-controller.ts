


type TMetadata = {
    page: number,
    limit: number,
    totalItems: number,
    totalPages: number,
    previousPage: number | null,
    nextPage: number | null
}

export class ResponseSuccess<T>{
   private data?: T;
   private message: string
   private metadata?: TMetadata
   constructor({data, metadata, message}: {data?: T, metadata?: TMetadata, message: string}){
    this.message = message
    this.data = data;
    this.metadata = metadata
   }
}