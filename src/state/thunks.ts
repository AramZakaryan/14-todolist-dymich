import {Dispatch} from "redux";
import {api, TaskFromAPIType, UpdateTaskType} from "../api/api";
import {addTodolistAC, changeTodolistTitleAC, remTodolistAC, setTodolistsAC} from "./todolistsReduser";
import {addTaskAC, updateTaskAC, removeTaskAC, setTasksAC} from "./tasksReduser";
import {useDispatch} from "react-redux";
import {CondType} from "../App";
import {roofReducerType} from "./store";


// TODOLISTS THUNK CREATORS

export const setTodolistsTC = () => (dispatch: Dispatch) => {
    api.getTodolists()
        .then(response => dispatch(setTodolistsAC(response.data)))
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    api.deleteTodolist(todolistId)
        .then(() => dispatch(remTodolistAC(todolistId)))
}

export const addTodolistTC = (todolistTitle: string) => (dispatch: Dispatch) => {
    api.createTodolist(todolistTitle)
        .then(response => dispatch(addTodolistAC(response.data.data.item)))
}

export const changeTodolistTitleTC = (todolistId: string, updatedTodolistTitle: string) => (dispatch: Dispatch) => {
    api.updateTodolist(todolistId, updatedTodolistTitle)
        .then(response => dispatch(changeTodolistTitleAC(todolistId, updatedTodolistTitle)))
}


// TASKS THUNK CREATORS

export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) =>
    api.getTasks(todolistId)
        .then(response => dispatch(setTasksAC(todolistId, response.data.items)))

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) =>
    api.deleteTask(todolistId, taskId)
        .then(() => dispatch(removeTaskAC(todolistId, taskId)))

export const addTaskTC = (todolistId: string, newTaskTitle: string) => (dispatch: Dispatch) =>
    api.createTask(todolistId, newTaskTitle)
        .then(response => dispatch(addTaskAC(todolistId, response.data.data.item)))

export type UpdateTaskThunkCreatorType = {
    title?: string
    status?: number
}


export const updateTaskTC = (todolistId: string, taskId: string, modelForThunk: UpdateTaskThunkCreatorType) =>
    (dispatch: Dispatch, getState: () => roofReducerType) => {

        const task = getState().tasks[todolistId].find(t => t.id === taskId)

        if (!task) {
            console.log("task not found")
            return
        }

        const updateTaskModel: UpdateTaskType = {
            title: task.title,
            description: "",
            status: task.isDone ? 2 : 0,
            priority: 0,
            startDate: "",
            deadline: "",
            ...modelForThunk


        }

        api.updateTask(todolistId, taskId, updateTaskModel)
            .then(response => {
                const {todoListId, id, title, status} = response.data.data.item // destructuring of response
                dispatch(updateTaskAC(todoListId, id, {title, isDone:status===2}))
            })
        
    }

