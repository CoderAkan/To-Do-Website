import { FC } from "react";
import TaskForm from "../components/TaskForm";
import { instance } from "../api/axios.api";
import { ICategory, IResponseTaskLoader } from "../types/types";
import { toast } from "react-toastify";

export const taskLoader = async () => {    
    const categories = await instance.get<ICategory[]>('/categories')
    const tasks = await instance.get('/tasks')
    const data = {
        categories: categories.data,
        tasks: tasks.data,
    }
    return data
}

export const taskAction = async ({ request }: any) => {
    switch (request.method) {
        case "POST": {
            console.log("post")
            const formData = await request.formData()
            const newTask = {
                title: formData.get('title'),
                description: formData.get('description'),
                categoryId: +formData.get('category'),
                isChecked: false,
            }
            await instance.post('/tasks', newTask)
            toast.success('Task was added')
            return null
        }
        case "DELETE": {
            const formData = await request.formData()
            const taskID = formData.get('id')
            await instance.delete(`tasks/task/${taskID}`)
            toast.success("The task was deleted successfully")
            return null
        }
        case "PATCH": {
            const formData = await request.formData()
            const taskId = formData.get('id')
            const updatedTask = {
                title: formData.get('title'),
                description: formData.get('description'),
                categoryId: +formData.get('category'),
                isChecked: false,
            }
            await instance.patch(`tasks/task/${taskId}`, updatedTask)
            toast.success("The task was updated")
            return null
        }
    }
}

const Tasks: FC = () => {
    return <> 
        <div className="grid grid-cols-3 gap-4 mt-4 items-start">
            {/* Add task */}
            <div className="grid col-span-2">
                <TaskForm type={"post"} prevTitle={""} prevDescription={""} setVisibleModal={function (visible: boolean): void {
                    throw new Error("Function not implemented.");
                } } />
            </div>
        </div>
    </>
}

export default Tasks;