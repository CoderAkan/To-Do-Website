import { FC, FormEvent, useState } from "react";

interface ICategoryModal {
  type: 'post' | 'patch';
  id?: number;
  setVisibleModal: (visible: boolean) => void;
  setIsEdit?: (visible: boolean) => void;
}

const CategoryModal: FC<ICategoryModal> = ({ type, id, setVisibleModal, setIsEdit }) => {
  const [title, setTitle] = useState<string>("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const response = await fetch("/api/categories", {
      method: type.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, id }),
    });

    if (response.ok) {
      // Handle success
      setVisibleModal(false);
      if (setIsEdit) setIsEdit(false);
    } else {
      // Handle error
      console.error("Error creating/updating category");
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 flex justify-center items-center">
      <form className="grid gap-2 w-[300px] p-5 rounded-md bg-slate-900" onSubmit={handleSubmit}>
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
        </label>
        <div className="flex items-center gap-2 justify-between">
          <button type="submit" className="btn btn-green">
            {type === 'patch' ? 'Save' : 'Create'}
          </button>
          <button className="btn btn-red" onClick={() => {
            setVisibleModal(false);
            if (setIsEdit) {
              setIsEdit(false);
            }
          }}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryModal;
