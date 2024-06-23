import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards, Req, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthorGuard } from 'src/guard/author.guard';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService, 
  ) {}

  @Post() // http://localhost:3000/api/tasks
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    return this.tasksService.create(createTaskDto, +req.user.id);
  }

  @Get('pagination') // http://localhost:3000/api/tasks/pagination?page=2&limit=5
  @UseGuards(JwtAuthGuard)
  findAllWithPagination(@Req() req, @Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.tasksService.findAllWithPagination(+req.user.id, +page, +limit)
  }

  @Get() // http://localhost:3000/api/tasks/
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.tasksService.findAll(+req.user.id);
  }

  @Get(':type/:checked/find') // http://localhost:3000/api/tasks/task/unchecked/find
  @UseGuards(JwtAuthGuard, AuthorGuard) // Ensure guard is applied
  findAllByType(@Req() req, @Param('checked') checked: string) {
    console.log("this works")
    return this.tasksService.findAllByType(+req.user.id, checked);
  }

  @Get(':type/:id') // http://localhost:3000/api/tasks/task/10
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param('id') id: string) {
    console.log('no this works')
    return this.tasksService.findOne(+id);
  }

  @Patch(':type/:id') // http://localhost:3000/api/tasks/task/10
  @UseGuards(JwtAuthGuard, AuthorGuard)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':type/:id') // http://localhost:3000/api/tasks/task/10
  @UseGuards(JwtAuthGuard, AuthorGuard)
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }

}
