import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entity/user.entity';
import { Status } from '@prisma/client';

@Injectable()
export class UserService {

    constructor(private readonly prismaService: PrismaService) { }

    async findOne({ userId, email }: { userId?: number, email?: string }): Promise<User> {
        return await this.prismaService.users.findFirst({
            where: {
              OR: [
                { id: userId },
                { email: email },
              ],
              status: Status.ACTIVE,
            },
          });
    }

}
