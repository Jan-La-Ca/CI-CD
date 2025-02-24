import { $Enums, Prisma } from '@prisma/client';

export class User implements Prisma.UsersUncheckedCreateInput{
    status: $Enums.Status;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    token?: Prisma.TokensUncheckedCreateNestedManyWithoutUserInput;
    id?: number;
    email: string;
    password: string;
    name: string;
    role: $Enums.Role;
}