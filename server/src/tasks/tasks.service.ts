import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor (
    private readonly prisma: PrismaService,
  ) {}
  async create(createTaskDto: CreateTaskDto, id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id: createTaskDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return await this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        isChecked: createTaskDto.isChecked,
        userId: id,
        categoryId: createTaskDto.categoryId,
      },
    });  
  }

  async findAll(id: number) {
    const tasks = await this.prisma.task.findMany({
      where: {
        user: {id}
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    })
    return tasks
  }

  async findOne(id: number) {
    if (id == undefined){
      throw new BadRequestException("Your id is undefined")
    }
    return await this.prisma.task.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
      }
    })
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const { title, description, isChecked } = updateTaskDto;
    const task = await this.prisma.task.findUnique({where: {id}, include: {user: true, category: true}})
    if (!task) throw new NotFoundException('Task not found')
    return await this.prisma.task.update({
      where: {id},
      data: {title, description, isChecked}
    })
  }

  async remove(id: number) {
    const task = await this.prisma.task.findUnique({where: {id}})
    if (!task) throw new NotFoundException('Task not found')
    return await this.prisma.task.delete({
      where: {id}
    })
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    const tasks = await this.prisma.task.findMany({
      where: {user: {id}},
      include: {user: true, category: true},
      orderBy: {createdAt: "desc"},
      take: limit,
      skip: (page - 1) * limit,
    })
    return tasks
  }

  async findAllByType(id: number, type: string) {
    const user = await this.prisma.user.findUnique({
        where: { id },
    });
    console.log('it stops here')
    // Check if user is not found
    if (!user) {
        throw new NotFoundException("User not found");
    }

    let b: boolean = false;
    if (type === "checked") {
        b = true;
    }
    console.log('It works until this way')

    const tasks = await this.prisma.task.findMany({
        where: {
            user: { id: user.id }, // Access user.id directly since user is found
            isChecked: b,
        }
    });

    return { tasks };
  }

}
