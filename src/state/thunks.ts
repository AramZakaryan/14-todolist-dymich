import {Dispatch} from "redux";
import {api} from "../api/api";
import {addTodolistAC, remTodolistAC, setTodolistsAC} from "./todolistsReduser";
import {addTaskAC, removeTaskAC, setTasksAC} from "./tasksReduser";
import {useDispatch} from "react-redux";


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



// TASKS THUNK CREATORS

export const setTasksTC = (todolistId: string) => (dispatch: Dispatch) =>
    api.getTasks(todolistId)
        .then(response => dispatch(setTasksAC(todolistId, response.data.items)))

export const removeTaskTC = (todolistId: string, taskId:string) => (dispatch: Dispatch) =>
    api.deleteTask(todolistId, taskId)
        .then(()=>dispatch(removeTaskAC(todolistId,taskId)))

export const addTaskTC = (todolistId:string, newTaskTitle:string) => (dispatch: Dispatch) =>
    api.createTask(todolistId,newTaskTitle)
        .then (response=>dispatch(addTaskAC(todolistId,response.data.data.item)))

