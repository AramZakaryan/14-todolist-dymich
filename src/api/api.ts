import axios from "axios"


export type TodolistFromAPIType = {
    id: string
    title: string
    addedDate: string
    order: number
}

// let todolistsFromAPI: TodolistFromAPIType[] = [
//     {
//         id: "c120798c-3062-4b8a-a1c9-0de81f13d59b",
//         title: "Changed Title by Api",
//         addedDate: "2024-01-28T09:47:55.237",
//         order: -4
//     },
//     {
//         id: "6c10c194-f375-4b56-9a6a-af24aaca228b",
//         title: "New Todolist",
//         addedDate: "2024-01-28T09:47:39.72",
//         order: -3
//     }
// ]


type TodolistsUniversalResponseType<D = {}> = {
    data: D
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}


export type TaskFromAPIType = {
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

// let tasksFromAPI: TaskFromAPIType[] = [
//     {
//         id: "d96ccc97-14c6-4197-b775-70b2bcea425f",
//         title: "New Task",
//         description: null,
//         todoListId: "c120798c-3062-4b8a-a1c9-0de81f13d59b",
//         order: -1,
//         status: 0,
//         priority: 1,
//         startDate: null,
//         deadline: null,
//         addedDate: "2024-01-28T17:14:09.183"
//     },
//     {
//         id: "8a0cd955-3201-4a11-a70b-332557403ed6",
//         title: "New Task",
//         description: null,
//         todoListId: "c120798c-3062-4b8a-a1c9-0de81f13d59b",
//         order: 0,
//         status: 0,
//         priority: 1,
//         startDate: null,
//         deadline: null,
//         addedDate: "2024-01-28T17:14:04.4"
//     }
// ]

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
    items: TaskFromAPIType []
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


export const api = {

    getTodolists() {
        return instance.get<TodolistFromAPIType[]>("todo-lists")
    },
    createTodolis(title: string) {
        return instance.post<TodolistsUniversalResponseType<{
            item: TodolistFromAPIType
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
        return instance.post<TasksUniversalResponseType<{item: TaskFromAPIType }>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<TasksUniversalResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, updateTaskModel: UpdateTaskType) {
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, updateTaskModel)
    },

}


