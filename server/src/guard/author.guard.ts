import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { CategoryService } from "src/category/category.service";
import { TasksService } from "src/tasks/tasks.service";


@Injectable()
export class AuthorGuard implements CanActivate{
    constructor (
        private readonly taskService: TasksService,
        private readonly categoryService: CategoryService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const type: string = request.params.type
        const id: number = +request.params.id
        const checked: string = request.params.checked
        if (checked) {
            return true
        }
        let entity 
        switch (type) {
            case 'task':
                entity = await this.taskService.findOne(+id)
                break
            case 'category':
                entity = await this.categoryService.findOne(+id)
                break
            default:
                throw new NotFoundException('Something went wrong')
                break
        }
        
        const user = request.user
        if (entity && user && entity.userId === user.id){
            return true
        } 
        return false    
    }
}