
export type Metadata = {
    page: number,
    limit: number,
    totalItems: number,
    totalPages: number,
}
export type TSuccessResponse<T> = {
    status: number;
    data: T | T[] | null;
    metadata?: Metadata
}
