import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'
import { IUser } from 'src/types/types'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({where: {email}})
    const passwordIsMatch = await argon2.verify(user.password, password)
    if (user && passwordIsMatch){
      return user
    }
    throw new UnauthorizedException('User or password is incorrect')
  }

  async login(user: IUser) {
    const {id, email} = user 
    const token = this.jwtService.sign({id: user.id, email: user.email})
    return {
      id, 
      email, 
      token,
    }
  }
}
