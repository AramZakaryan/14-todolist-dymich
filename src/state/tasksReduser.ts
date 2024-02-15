import {allTasksType} from "../App";
import {v1} from "uuid";
import {addTodolistActionType, remTodolistActionType, setTodolistsType} from "./todolistsReduser";
import {TaskFromAPIType} from "../api/api";
import {TaskType} from "../Todolist";

export type tasksActionType = removeTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | addTodolistActionType
    | remTodolistActionType
    | setTodolistsType
    | setTasksActionType


type removeTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, id: string) => ({
    type: "REMOVE-TASK",
    todolistId,
    taskId: id
}) as const

type addTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, taskFromAPI: TaskFromAPIType) => ({
    type: "ADD-TASK",
    todolistId,
    taskFromAPI
}) as const


type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, id: string, isDone: boolean) => ({
    type: "CHANGE-TASK-STATUS",
    todolistId,
    taskId: id,
    taskIsDone: isDone
}) as const

type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (todolistId: string, id: string, title: string) => ({
    type: "CHANGE-TASK-TITLE",
    todolistId,
    id,
    title
}) as const

type setTasksActionType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistId: string, tasksFromAPI: TaskFromAPIType[]) => ({
    type: "SET-TASKS",
    todolistId,
    tasksFromAPI,
}) as const


const initialState: allTasksType = {}
// const initialState: allTasksType = {
//     [todolistId1]: [
//         {id: v1(), title: "CSS & HTML", isDone: false},
//         {id: v1(), title: "JS", isDone: false},
//         {id: v1(), title: "React", isDone: false},
//         {id: v1(), title: "Redux", isDone: false}
//     ],
//     [todolistId2]: [
//         {id: v1(), title: "Book", isDone: false},
//         {id: v1(), title: "Milk", isDone: true},
//     ],
// }

export const tasksReducer = (state: allTasksType = initialState, action: tasksActionType): allTasksType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t =>
                    t.id !== action.taskId
                )
            }
        case "ADD-TASK":
            return {...state,
            [action.todolistId]:[{...action.taskFromAPI, isDone:false} as TaskType,...state[action.todolistId]]}
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t =>
                    t.id === action.taskId
                        ? {
                            ...t,
                            isDone: action.taskIsDone
                        }
                        : t
                )
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t =>
                    t.id === action.id
                        ? {
                            ...t,
                            title: action.title
                        }
                        : t
                )
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistFromAPI.id]: []
            }
        case "REMOVE-TODOLIST":
            // let stateCopy = {...state}
            // delete stateCopy[action.todolistId]
            // return stateCopy
            const {[action.todolistId]: {}, ...restState} = state
            return restState
        case "SET-TODOLISTS":
            let stateCopy: allTasksType = {}
            action.todolistsFromAPI.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        case "SET-TASKS":
            return {
                ...state,
                [action.todolistId]: action.tasksFromAPI.map(t => ({
                        ...t,
                        isDone: false

                    })
                )
            }
        default:
            return state
    }
}



