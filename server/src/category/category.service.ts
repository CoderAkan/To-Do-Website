import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor (
    private readonly prisma: PrismaService
  ) {}
  async create(createCategoryDto: CreateCategoryDto, id: number) {
    const category = await this.prisma.category.findMany({
      where: {
        userId: id,
        title: createCategoryDto.title,
      }
    });
    if (category.length) throw new BadRequestException('This category already exists');
    return await this.prisma.category.create({
      data: {
        title: createCategoryDto.title,
        userId: id 
      },
    });
  }
  


  async findAll(id: number) {
    return await this.prisma.category.findMany({
      where: {
        user: {id},
      },
      include: {
        tasks: true,
      }
    })
  }

  async findOne(categoryId: number) {
    if (categoryId == undefined){
      throw new BadRequestException("Your id is undefined")
    }
    return await this.prisma.category.findUnique({ where: { id: categoryId } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto, userId: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found!');
  
    const data: Prisma.CategoryUpdateInput = {};
    if (updateCategoryDto.title) {
      data.title = updateCategoryDto.title;
    }
    // Optional: Check if userId should be updated or if it's relevant to your logic.
    // If updating the userId is necessary, you can handle it here based on your requirements.
  
    return await this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Find all tasks that belong to the category
    const tasks = await this.prisma.task.findMany({ where: { categoryId: id } });
    
    await this.prisma.task.updateMany({
      where: {
        categoryId: id, 
      },
      data: {
        categoryId: null,
      }
    })

    return await this.prisma.category.delete({
      where: {
        id: id,
      }
    });
  }
}
