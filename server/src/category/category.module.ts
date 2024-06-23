import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from 'src/tasks/tasks.service';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [CategoryController],
  providers: [CategoryService, TasksService],
})
export class CategoryModule {}
