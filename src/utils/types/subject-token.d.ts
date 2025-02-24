import { Role } from "@prisma/client";

export type TSubjectToken = {
    sub: number;
    email: string;
    role: Role;
    iat: number,
    exp: number
}