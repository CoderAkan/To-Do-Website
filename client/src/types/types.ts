export interface IUser {
    id: number
    email: string
    token: string
}

export interface IUserData {
    email: string,
    password: string
}

export interface IResponseUser {
    email: string
    id: number
    createdAt: string
    updatedAt: string
    password: string
}

export interface IResponseUserData {
    token: string
    user: IResponseUser
}


export interface ICategory {
    title: string
    id: number
    createdAt: string
    updatedAt: string
    tasks: []
}

export interface IResponseTaskLoader {
    categories: ICategory[]
    tasks: ITask[]
}

export interface ITask {
    title: string
    description: string
    createdAt: string
    updatedAt: string
    isChecked: boolean
    id: number
    userId: number
    categoryId?: number
    category?: {
        id: number;
        title?: string;
      };
}