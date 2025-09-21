import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma/prisma.service';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt'

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
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) { }

  async create(createUserInput: CreateUserInput) {
    const passwordHash = await hash(createUserInput.password, {});
    console.log(passwordHash)
    return this.prisma.user.create({ data: { ...createUserInput, password: passwordHash } });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: userSafeSelect,
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findFirstOrThrow({ where: { id }, select: userSafeSelect, });
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({ where: { id }, data: updateUserInput });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true, username: true, password: true },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await verify(user.password, password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    // Sign JWT with an object, not a JSON string
    const payload = { sub: user.id, username: user.username };
    const token = this.jwt.sign(payload);

    return { idToken: token };
  }
}
