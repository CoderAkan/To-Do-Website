import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email, 
      }
    });
    
    if (existUser){
      throw new BadRequestException('This email already exists')
    }
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: await argon2.hash(createUserDto.password),
      }
  })

    const token = this.jwtService.sign({email: createUserDto.email})

    return {user, token}
  
}

  async findOne(email: string) {
    return await this.prisma.user.findUnique({
      where: { 
        email: email 
      }
    }); 
  }
}
