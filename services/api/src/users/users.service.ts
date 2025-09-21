import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'argon2';

const userSafeSelect = {
  id: true,
  email: true,
  username: true,
  displayName: true,
  bio: true,
  avatarUrl: true,
  createdAt: true,
  updatedAt: true,
} as const;


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserInput: CreateUserInput) {
    const passwordHash = await hash(createUserInput.password, {  });
    console.log(passwordHash)
    return this.prisma.user.create({ data: { ...createUserInput, password: passwordHash } });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: userSafeSelect,
    });
  }

  findOne(id: string) {
    return this.prisma.user.findFirstOrThrow({ where: { id }, select: userSafeSelect, });
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({ where: { id }, data: updateUserInput });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
