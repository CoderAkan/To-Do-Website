import { FC, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import { IResponseTaskLoader, ITask } from '../types/types';
import { instance } from '../api/axios.api';
import ReactPaginate from 'react-paginate';
import ToDo from './to-do';

interface IUnfinishedTasksTable{
    limit: number
}

const UnfinishedTasksTable: FC<IUnfinishedTasksTable> = ({limit = 5 }) => {
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
    <div className='bg-slate-800 px-4 py-3 mt-4 mb-4 rounded-md grid'>
      {
        data.map((task, index) => (
          <ToDo task={task} index={index} />
        ))}    
    </div> 
    
  </>
  )
}

export default UnfinishedTasksTable