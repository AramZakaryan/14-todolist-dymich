import {CondType, todolistType} from "../App";
import {v1} from "uuid";
import {TodolistFromAPIType} from "../api/api";

export type todolistActionType = remTodolistActionType
    | addTodolistActionType
    | changeTodolistTitleActionType
    | changeFilterCondActionType
    | setTodolistsType

export type remTodolistActionType = ReturnType<typeof remTodolistAC>
export const remTodolistAC = (todolistId: string) => ({
    type: "REMOVE-TODOLIST",
    todolistId
}) as const

export type addTodolistActionType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolistFromAPI:TodolistFromAPIType) => ({
    type: "ADD-TODOLIST",
    todolistFromAPI,
}) as const

type changeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, updatedTodolistTitle: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    todolistId,
    updatedTodolistTitle
}) as const

type changeFilterCondActionType = ReturnType<typeof changeFilterCondAC>
export const changeFilterCondAC = (todolistId: string, updatedFilterCond: CondType) => ({
    type: "CHANGE-FILTER-COND",
    todolistId,
    updatedFilterCond
}) as const

export type setTodolistsType = ReturnType<typeof setTodolistsAC>
// export const setTodolistsAC = (todolistsFromAPI: TodolistFromAPIType[]) => ({
export const setTodolistsAC = (todolistsFromAPI: TodolistFromAPIType[]) => ({
    type: "SET-TODOLISTS",
    todolistsFromAPI
}) as const


export const todolistId1 = v1()
export const todolistId2 = v1()

// const initialState: todolistType[] = [
//     {id: todolistId1, todolistTitle: "What to learn?", filterCond: "All"},
//     {id: todolistId2, todolistTitle: "What to buy?", filterCond: "All"}
// ]

const initialState: todolistType[] = []


export const todolistsReducer = (state: todolistType[] = initialState, action: todolistActionType): todolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todolistId)
        case "ADD-TODOLIST":
            return [
                {
                    todolistTitle: action.todolistFromAPI.title,
                    filterCond: "All",
                    ... action.todolistFromAPI
                },
                ...state
            ]
        case "CHANGE-TODOLIST-TITLE":
            const updatedTodolist1 = state.find(tl => tl.id === action.todolistId)
            if (updatedTodolist1) {
                updatedTodolist1.todolistTitle = action.updatedTodolistTitle
                return [...state]
            } else {
                throw new Error("todolist.id is not correct, so todolistTitle cannot be changed")
            }
        case "CHANGE-FILTER-COND":
            const updatedTodolist2 = state.find(tl => tl.id === action.todolistId)
            if (updatedTodolist2) {
                updatedTodolist2.filterCond = action.updatedFilterCond
                return [...state]
            } else {
                throw new Error("todolist.id is not correct, so todolist filterCond cannot be changed")
            }
        case "SET-TODOLISTS":
            return action.todolistsFromAPI.map(tl => ({...tl, todolistTitle: tl.title, filterCond: "All"}))
        default:
            return state
    }
}
