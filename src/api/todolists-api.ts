import axios from "axios";

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type TodolistsUniversalResponseType<D = {}> = {
    data: D
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}


type GetTaskType = {
    id: string
    title: string
    description: null | string
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: null | string
    deadline: null | string
    addedDate: string
}

export type UpdateTaskType = {
    // id: string
    title: string
    description: null | string
    // todoListId: string
    // order: number
    status: number
    priority: number
    startDate: null | string
    deadline: null | string
    // addedDate: string
}

type GetTasksResponseTypes = {
    items: GetTaskType []
    totalCount: number
    error: null | string
}

type TasksUniversalResponseType<D = {}> = {
    data: D
    messages: string []
    fieldsErrors: string[]
    resultCode: number
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "3485684c-f79f-42a9-a6c9-e22cde9c6d79"
    }
})


export const todolistsAPI = {

    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists")
    },
    createTodolis(title: string) {
        return instance.post<TodolistsUniversalResponseType<{
            item: TodolistType
        }>>("todo-lists", {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<TodolistsUniversalResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, newTitle: string) {
        return instance.put<TodolistsUniversalResponseType>(`todo-lists/${todolistId}`, {title: newTitle})
    },

    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseTypes>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<TasksUniversalResponseType<GetTaskType>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<TasksUniversalResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, updateTaskModel:UpdateTaskType) {
            return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`,updateTaskModel)
        },

}


