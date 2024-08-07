import { FC, useState } from "react";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import CategoryModal from "../components/CategoryModal";
import { instance } from "../api/axios.api";
import { ICategory } from "../types/types";
import { toast } from "react-toastify";

export const categoriesAction = async ({request}: any) => {
    switch (request.method){
        case "POST": {
            const formData = await request.formData()
            const newCategory = {
                title: formData.get('title'),
            }
            await instance.post('/categories', newCategory)
            toast.success('Category was added')
            return null
        }
        case "PATCH": {
            const formData = await request.formData()
            const category = {
                id: formData.get('id'),
                title: formData.get('title')
            }
            await instance.patch(`categories/category/${category.id}`, category)
            toast.success('Category was updated')
            return null
        }
        case "DELETE": {
            const formData = await request.formData()
            const categoryId = formData.get('id')
            await instance.delete(`/categories/category/${categoryId}`)
            toast.success('Category was deleted')
            return null
        }
    }
}

export const categoriesLoader = async () => {
    const {data} = await instance.get<ICategory[]>('/categories')
    return data
}

const Categories: FC = () => {
    const categories = useLoaderData() as ICategory[]
    const [categoryId, setCategoryId] = useState<number>(0)
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    return (
        <>
            <div className="mt-10 p-4 rounded-md bg-slate-800">
                <h1>Your category list:</h1>
                {/* Category list */}
                <div className="flex flex-wrap mt-2 items-center gap-2">
                    {categories.map((category, index) => (
                        <div key={index} className="group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2">
                        {category.title}
                        <div className="absolute hidden px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 items-center justify-between group-hover:flex">
                            <button onClick={() => {
                                setVisibleModal(true)
                                setCategoryId(category.id)
                                setIsEdit(true)
                            }}>
                                <AiFillEdit />
                            </button>
                            <Form className="flex" method="delete" action="/categories">
                                <input type="hidden" name='id' value={category.id} />
                                <button type='submit'>
                                    <AiFillCloseCircle />
                                </button>
                            </Form>
                        </div>
                    </div>
                    ))}
                </div>
                {/* Add category */}
                <button className="max-w-fit flex items-center gap-2 text-white/50 mt-5 hover:text-white" onClick={() => setVisibleModal(true)}>
                    <FaPlus />
                    <span>Create a new category</span>
                </button>
            </div>
            
            {/* Add category modal */}
            {visibleModal && !isEdit && (
                <CategoryModal type='post' setVisibleModal={setVisibleModal} />
                )
            }
            {/* Update category modal */}
            {visibleModal && isEdit && (
                <CategoryModal type='patch' id={categoryId} setVisibleModal={setVisibleModal} />
                )
            } 

        </>
    )
}

export default Categories;