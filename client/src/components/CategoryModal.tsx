import { FC, useState } from "react";
import { Form } from "react-router-dom";

interface ICategoryModal {
  type: 'post' | 'patch';
  id?: number;
  setVisibleModal: (visible: boolean) => void;
  setIsEdit?: (edit: boolean) => void
}

const CategoryModal: FC<ICategoryModal> = ({ type, id, setVisibleModal, setIsEdit }) => {
  const [title, setTitle] = useState<string>("");
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 flex justify-center items-center">
      <Form 
        action="/categories"
        method={type}
        className="grid w-[300px] gap-2 rounded-md bg-slate-900 p-5"
      >
        <label htmlFor="title">
          <small>Category title</small>
          <input
            className="input w-full"
            type="text"
            name="title"
            placeholder="title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input type="hidden" name="id" value={id}/>
        </label>
        <div className="flex items-center gap-2 justify-between">
          <button type="submit" className="btn btn-green">
            {type === 'patch' ? 'Save' : 'Create'}
          </button>
          <button className="btn btn-red" onClick={() => {
            setVisibleModal(false);
            if(setIsEdit) {setIsEdit(false);}
          }}>
            Close
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CategoryModal;
