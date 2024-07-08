import { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTaskLoader } from '../types/types'
import CategoryModal from './CategoryModal'

interface ITaskForm {
  type: 'post' | 'patch';
  prevTitle: string;
  prevDescription: string;
  prevCategory?: number;
  prevDate?: string;
  id?: number;
  setVisibleModal: (visible: boolean) => void;
  setIsEdit?: (edit: boolean) => void;
}

const TaskForm: FC<ITaskForm> = ({type, id, setVisibleModal, setIsEdit, prevTitle, prevDescription, prevCategory, prevDate}) => {
  const { categories } = useLoaderData() as IResponseTaskLoader
  const [visibleTaskModal, setVisibleCatModal] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<number>();
  const nowDate = new Date()
  const [dueDate, setDueDate] = useState<string>(nowDate.toISOString().substring(0, 10));


  return (
    <div className='rounded-md bg-slate-800 p-4'>
        <Form 
            className='grid gap-2' 
            method={type} 
            action='/tasks'
        >
            <label htmlFor="title" className='grid'>
                <span>Title</span>
                <input 
                    type="text" 
                    className='input' 
                    placeholder={type=="patch" ? prevTitle : "Title"} 
                    name='title' 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <input type="hidden" name="id" value={id}/>
            </label>
            
            <label htmlFor="description" className='grid'>
                <span>Description</span>
                <input type="text" className='input' placeholder={type=="patch" ? prevDescription : "Title"} name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>

            <label htmlFor="due date" className='grid'>
                <span>Due Date</span>
                <input type="date" className='input' name='dueDate' value={dueDate === '' ? prevDate : dueDate} onChange={(e) => {
                    const dateString = e.target.value; 
                    const dateObject = new Date(dateString);

                    setDueDate(dateObject.toISOString().substring(0, 10));
                }} />
            </label>

            {/* Select category*/}
            {categories.length ? <label htmlFor="category" className='grid'>
                <span>Category</span>
                <select className='input' name="category" required>
                    {categories.map((ctg, index) => (
                        <option defaultValue={prevCategory}  key={index} value={type === "patch" ? category :  ctg.id} >{ctg.title}</option>
                    ))}
                </select>
            </label> : <h1 className='mt-1 text-red-300'>To continue create a category first</h1>}

            <button 
                type="button"
                onClick={() => setVisibleModal(true)}
                className="max-w-fit flex items-center gap-2 text-white/50 hover:text-white">
                    <FaPlus />
                    <span>Manage categories</span>
            </button>
            
            {/* Submit button */}
            <div className="flex items-center gap-2 justify-between">
                <button type="submit" className='btn btn-green max-w-fit mt-2'>
                    {type === 'patch' ? 'Save' : 'Create'}
                </button>
                { type === 'patch' && (<button className="btn btn-red" onClick={() => {
                    setVisibleModal(false);
                    if(setIsEdit) {setIsEdit(false);}
                }}>Close</button>)}
        </div>
        </Form>      
        {/* Add category modal */}
        {visibleTaskModal && (
                <CategoryModal type='post' setVisibleModal={setVisibleCatModal} />
                )
            }  
    </div>
  )
}

export default TaskForm
