import {allTasksType, CondType, todolistType} from "../App";
import {v1} from "uuid";
import {addTodolistActionType, remTodolistActionType, todolistId1, todolistId2} from "./todolistsReduser";

export type tasksActionType = removeTaskActionType
    | addTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | addTodolistActionType
    | remTodolistActionType

type removeTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, id: string) => ({
    type: "REMOVE-TASK",
    todolistId,
    taskId: id
}) as const

type addTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, title: string) => ({
    type: "ADD-TASK",
    todolistId,
    taskTitle: title
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


const initialState: allTasksType = {
    [todolistId1]: [
        {id: v1(), title: "CSS & HTML", isDone: false},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ],
    [todolistId2]: [
        {id: v1(), title: "Book", isDone: false},
        {id: v1(), title: "Milk", isDone: true},
    ],
}

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
            return {
                ...state,
                [action.todolistId]: [
                    {id: v1(), title: action.taskTitle, isDone: false},
                    ...state[action.todolistId]
                ]
            }
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
                [action.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            // let stateCopy = {...state}
            // delete stateCopy[action.todolistId]
            // return stateCopy
            const {[action.todolistId]: {}, ...restState} = state
            return restState
        default:
            return state
    }
}