import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {todolistsReducer} from "./todolistsReduser";
import {tasksReducer} from "./tasksReduser";
import {thunk} from "redux-thunk";


export type roofReducerType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers(
    {
        todolists: todolistsReducer,
        tasks: tasksReducer
    }
)

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store