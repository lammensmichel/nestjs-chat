import { Injectable } from '@nestjs/common';
import { AuthBody } from './auth.controller';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { UserPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ authBody }: { authBody: AuthBody }) {
    const { email, password } = authBody;
    const hashedPassword = await this.hashPassword({ password });
    console.log({ hashedPassword, password });

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!existingUser) {
      throw new Error("L'utilisateur n'existe pas");
    }

    const isPasswordValid = await this.isPasswordValid({
      password,
      hashedPassword: existingUser.password,
    });
    if (!isPasswordValid) {
      throw new Error('Le mot de passe est invalid');
    }
    return await this.authenticateUser({
      userId: existingUser.id,
    });
  }

  async register({ register }: { authBody: AuthBody }) {
    const { email, password } = registerBody;
    const hashedPassword = await this.hashPassword({ password });
    console.log({ hashedPassword, password });

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!existingUser) {
      throw new Error("L'utilisateur n'existe pas");
    }

    const isPasswordValid = await this.isPasswordValid({
      password,
      hashedPassword: existingUser.password,
    });
    if (!isPasswordValid) {
      throw new Error('Le mot de passe est invalid');
    }
    return await this.authenticateUser({
      userId: existingUser.id,
    });
  }

  private async hashPassword({ password }): Promise<string> {
    return await hash(password, 10);
  }

  private async isPasswordValid({
    password,
    hashedPassword,
  }: {
    password: string;
    hashedPassword: string;
  }) {
    return await compare(password, hashedPassword);
  }

  private async authenticateUser({ userId }: UserPayload) {
    const payload: UserPayload = { userId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
