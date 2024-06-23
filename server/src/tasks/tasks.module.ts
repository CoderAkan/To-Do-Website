import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UserModule } from 'src/user/user.module';
import { CategoryService } from 'src/category/category.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [TasksController],
  providers: [TasksService, CategoryService],
})
export class TasksModule {}
