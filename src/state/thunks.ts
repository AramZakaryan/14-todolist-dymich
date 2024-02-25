import {Dispatch} from "redux";
import {api, UpdateTaskType} from "../api/api";
import {
    addTodolistAC,
    changeTodolistTitleAC,
    remTodolistAC,
    setTodolistsAC,
    setTodolistsActionType, todolistActionType
} from "./todolistsReduser";
import {addTaskAC, updateTaskAC, removeTaskAC, setTasksAC, tasksActionType} from "./tasksReduser";
import {roofReducerType} from "./store";
import {ThunkAction} from "redux-thunk";


/**
 * P.S. (Aram) Type of all possible actions, includes todolistActions and taskActions
 */
export type AllActionsType = todolistActionType | tasksActionType

/**
 * P.S. (Aram) Universal type of thunk actions
 */
type UniversalThunkActionType = ThunkAction<void, roofReducerType, unknown, AllActionsType>


// TODOLISTS THUNK CREATORS

/**
 * P.S. (Aram) version 1. setTodolistsTC by non-async function
 */
// export const setTodolistsTC = (): UniversalThunkActionType =>
//     (dispatch) => {
//         api.getTodolists()
//             .then(response => dispatch(setTodolistsAC(response.data)))
//     }

/**
 * P.S. (Aram) version 2. setTodolistsTC by async function
 */
export const setTodolistsTC = (): UniversalThunkActionType =>
    async (dispatch) => {
        const response = await api.getTodolists()
            dispatch(setTodolistsAC(response.data))
    }

export const removeTodolistTC = (todolistId: string): UniversalThunkActionType =>
    (dispatch) => {
        api.deleteTodolist(todolistId)
            .then(() => dispatch(remTodolistAC(todolistId)))
    }

export const addTodolistTC = (todolistTitle: string): UniversalThunkActionType =>
    // (dispatch: Dispatch<AllActionsType>) => {
    (dispatch) => {
        api.createTodolist(todolistTitle)
            // .then(response => dispatch(addTodolistAC(response.data.data.item)))
            .then(() => dispatch(setTodolistsTC()))
    }


export const changeTodolistTitleTC = (todolistId: string, updatedTodolistTitle: string): UniversalThunkActionType =>
    (dispatch) => {
        api.updateTodolist(todolistId, updatedTodolistTitle)
            .then(response => dispatch(changeTodolistTitleAC(todolistId, updatedTodolistTitle)))
    }


// TASKS THUNK CREATORS

export const setTasksTC = (todolistId: string): UniversalThunkActionType =>
    (dispatch) =>
        api.getTasks(todolistId)
            .then(response => dispatch(setTasksAC(todolistId, response.data.items)))

export const removeTaskTC = (todolistId: string, taskId: string): UniversalThunkActionType =>
    (dispatch) =>
        api.deleteTask(todolistId, taskId)
            .then(() => dispatch(removeTaskAC(todolistId, taskId)))

export const addTaskTC = (todolistId: string, newTaskTitle: string): UniversalThunkActionType =>
    (dispatch) =>
        api.createTask(todolistId, newTaskTitle)
            .then(response => dispatch(addTaskAC(todolistId, response.data.data.item)))


export type UpdateTaskThunkCreatorType = {
    title?: string
    status?: number
}


export const updateTaskTC = (todolistId: string, taskId: string, modelForThunk: UpdateTaskThunkCreatorType): UniversalThunkActionType =>
    // (dispatch: Dispatch<AllActionsType>, getState: () => roofReducerType) => {
    (dispatch, getState) => {

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
                dispatch(updateTaskAC(todoListId, id, {title, isDone: status === 2}))
            })

    }

