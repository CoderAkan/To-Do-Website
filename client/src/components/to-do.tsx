import {FC, useEffect, useState} from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'
import { Form, Route, Router, useNavigate } from 'react-router-dom'
import { ITask } from '../types/types'
import TaskForm from './TaskForm'
import { instance } from '../api/axios.api'
import { formatDate } from '../helpers/date.helper'
import Tasks from '../pages/tasks'

interface ItoDo {
    task: ITask;
    index: number
}

const ToDo: FC<ItoDo> = ({task, index}) => {
  const [isVisible, setVisibleModal] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [taskId, setTaskId] = useState<number>(0)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [category, setCategory] = useState<number>()
  const [isCheck, setIsCheck] = useState<boolean>(task.isChecked)
  const [dueDate, setDueDate] = useState<string>('')
  const [someVar, setSomeVar] = useState(null);

  const toggleCheckbox = async () => {
    const updatedTask = {
        title: task.title,
        description: task.description,
        categoryId: task.categoryId,
        isChecked: isCheck,
        dueDate: new Date(task.dueDate),
    }
    await instance.patch(`/tasks/task/${task.id}`, {isChecked: isCheck})
}
  useEffect(() => {
    toggleCheckbox()
  }, [isCheck])
  return (
    <>
    <div className='grid grid-cols-4 bg-slate-900 rounded-md m-5 py-2 px-3 text-white items-center' key={index}>
        <div className="flex gap-x-4">
            <input 
                type="checkbox"
                checked={task.isChecked}
                onChange={() => {
                    setIsCheck(!isCheck)
                }
            }
            />
            <p className={task.isChecked ? 'line-through' : ''}>{task.title}</p>
        </div>
        <p className={task.isChecked ? 'line-through justify-start items-start mr-8' : 'justify-start items-start mr-8'}>{task.category?.title || ""}</p>
        <p className={task.isChecked ? 'line-through justify-start items-start mr-8' : 'justify-start items-start mr-8'}>{formatDate(task.dueDate.toString())}</p>
        <div className='flex ml-auto gap-x-8'>
            <button className='btn hover:btn-green items-center justify-center' onClick={() => {
                setVisibleModal(true)
                setTaskId(task.id)
                setTitle(task.title)
                setDescription(task.description)
                setCategory(task.categoryId)
                setDueDate(task.dueDate.substring(0, 10))
                setIsEdit(true)
            }}>
            <FaPen />
            </button>
            <Form method='delete' action='/tasks'>
                <input type="hidden" name='id' value={task.id} />
                <button className='items-center justify-center btn hover:btn-red ml-auto'>
                  <FaTrash />
                </button>
            </Form>
        </div>
    </div>

    {/* Update task */}
    {isVisible && isEdit && (
        <TaskForm prevTitle={title} prevDescription={description} prevCategory={category} prevDate={dueDate}  type='patch' id={taskId}  setVisibleModal={setVisibleModal} />
        )
    } 
    </>
  )
}

export default ToDo
