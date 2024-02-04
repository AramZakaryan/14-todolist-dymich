import {Provider} from "react-redux";
import {store} from "../state/store";
import {v1} from "uuid";
import {todolistsReducer} from "../state/todolistsReduser";
import {tasksReducer} from "../state/tasksReduser";
import {combineReducers, legacy_createStore} from "redux";

export type roofReducerType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})


const initialGlobalState = {
        todolists: [
            {id: "todolistId1", todolistTitle: "What to learn!!!", filterCond: "all"},
            {id: "todolistId2", todolistTitle: "What to buy!!!", filterCond: "all"}
        ],
        tasks: {
            ["todolistId1"]: [
                {id: v1(), title: "HTML&CSS!!!", isDone: true},
                {id: v1(), title: "JS!!!", isDone: false}
            ],
            ["todolistId2"]: [
                {id: v1(), title: "Milk!!!", isDone: false},
                {id: v1(), title: "React Book!!!", isDone: true}
            ]
        }
    }
;

export const storeForStory = legacy_createStore(rootReducer, initialGlobalState as roofReducerType)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return (
        <Provider store={storeForStory}>
            {storyFn()}
        </Provider>
    )
}
