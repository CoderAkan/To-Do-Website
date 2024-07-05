import { FC, useEffect, useState } from 'react'
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { FaTrash } from 'react-icons/fa';
import { Form, useLoaderData } from 'react-router-dom';
import { IResponseTaskLoader, ITask } from '../types/types';
import { formatDate } from '../helpers/date.helper';
import { instance } from '../api/axios.api';
import ReactPaginate from 'react-paginate';

interface IUnfinishedTasksTable{
    limit: number

}

const UnfinishedTasksTable: FC<IUnfinishedTasksTable> = ({limit = 3 }) => {
  const { tasks: initialTasks } = useLoaderData() as IResponseTaskLoader
  const [tasks, setTasks] = useState<ITask[]>(initialTasks)
  const [data, setData] = useState<ITask[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)

  const fetchTasks = async (page: number) => {
    const response = await instance.get(`/tasks/pagination?page=${page}&limit=${limit}`)
    setData(response.data)
    setTotalPages(Math.ceil(tasks.length / limit))
  }
  useEffect(() => {
    fetchTasks(currentPage)
  }, [currentPage, tasks])

  const handlePageChange = (selectedItem: {selected: number}) => {
    setCurrentPage(selectedItem.selected + 1)
  }

  const handleCheckToggle = (index: number) => {
    const updatedTasks = data.map((task, i) =>
        i === index ? {...task, isChecked: !task.isChecked }: task
    );
    setData(updatedTasks);
  }



  return (
  <>
    <ReactPaginate 
        className='flex gap-3 justify-end mt-4 items-center'
        activeClassName='bg-blue-600 rounded-sm'
        pageLinkClassName='text-white text-xs py-1 px-2 rounded-sm'
        previousClassName='text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
        nextClassName='text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
        disabledClassName='text-white/50 cursor-not-allowed'
        disabledLinkClassName='text-slate-600 cursor-not-allowed'
        pageCount={totalPages}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}

    />
    <div className='bg-slate-800 px-4 py-3 mt-4 rounded-md'>
        <table className='w-full'>
            <thead>
                <tr>
                    <td className='font-bold'>✅/❌</td>
                    <td className='font-bold'>#</td>
                    <td className='font-bold'>Title</td>
                    <td className='font-bold'>Description</td>
                    <td className='font-bold'>Category</td>
                    <td className='font-bold'>Date</td>
                    <td className='text-right'>Action</td>
                </tr>
            </thead>
            <tbody>
                {
                data.map((task, index) => (
                    <tr key={index}>
                    <td onClick={() => handleCheckToggle(index)}>{task.isChecked ? <IoMdCheckboxOutline /> : <MdOutlineCheckBoxOutlineBlank />}</td>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.category?.title}</td>
                    <td> {formatDate(task.createdAt)} </td>
                    <td>
                        <Form method='delete' action='/tasks'>
                            <input type="hidden" name='id' value={task.id} />
                            <button className='btn hover:btn-red ml-auto'>
                                <FaTrash />
                            </button>
                        </Form>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div> 
  </>)
}

export default UnfinishedTasksTable
