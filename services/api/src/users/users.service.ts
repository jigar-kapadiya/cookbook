import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUserInput: CreateUserInput) {
    return this.prisma.users.create({ data: createUserInput });
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(id: number) {
    return this.prisma.users.findFirstOrThrow({ where: { id } });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return this.prisma.users.update({ where: { id }, data: updateUserInput });
  }

  remove(id: number) {
    return this.prisma.users.delete({ where: { id } });
  }
}
