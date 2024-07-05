import { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTaskLoader } from '../types/types'
import CategoryModal from './CategoryModal'

const TransactionForm: FC = () => {
  const { categories } = useLoaderData() as IResponseTaskLoader
  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  return (
    <div className='rounded-md bg-slate-800 p-4'>
        <Form className='grid gap-2' method='post' action='/tasks'>
            <label htmlFor="title" className='grid'>
                <span>Title</span>
                <input type="text" className='input' placeholder='Title' name='title' required />
            </label>
            <label htmlFor="description" className='grid'>
                <span>Description</span>
                <input type="text" className='input' placeholder='Description' name='description' />
            </label>

            {/* Select category*/}
            {categories.length ? <label htmlFor="category" className='grid'>
                <span>Category</span>
                <select className='input' name="category" required>
                    {categories.map((ctg, index) => (
                        <option key={index} value={ctg.id}>{ctg.title}</option>
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
            <button className='btn btn-green max-w-fit mt-2' >Submit</button>
        </Form>      
        {/* Add category modal */}
        {visibleModal && (
                <CategoryModal type='post' setVisibleModal={setVisibleModal} />
                )
            }  
    </div>
  )
}

export default TransactionForm
