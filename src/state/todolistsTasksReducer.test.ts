// import {allTasksType, CondType, todolistType} from "../App";
// import {v1} from "uuid";
// import {
//     tasksActionType,
//     addTaskAC,
//     changeTaskStatusAC,
//     changeTaskTitleAC,
//     removeTaskAC,
//     tasksReducer
// } from "./tasksReduser";
// import {addTodolistAC, remTodolistAC, setTodolistsAC, todolistActionType, todolistsReducer} from "./todolistsReduser";
// import {TodolistFromAPIType} from "../api/todolists-api";
// import {actionType} from "./usersReduser";
//
// let initialtodolistState: todolistType[]
// let initialTasksState: allTasksType
// let todolistId1: string
// let todolistId2: string
// let taskId1_1: string
// let taskId1_2: string
//
// beforeEach(() => {
//
//     todolistId1 = v1()
//     todolistId2 = v1()
//
//     taskId1_1 = v1()
//     taskId1_2 = v1()
//
//     initialtodolistState = [
//         {id: todolistId1, todolistTitle: "What to learn?", filterCond: "All"},
//         {id: todolistId2, todolistTitle: "What to buy?", filterCond: "All"}
//     ]
//
//     initialTasksState = {
//         [todolistId1]: [
//             {id: v1(), title: "CSS & HTML", isDone: false},
//             {id: taskId1_1, title: "JS", isDone: false},
//             {id: taskId1_2, title: "React", isDone: false},
//             {id: v1(), title: "Redux", isDone: false}
//         ],
//         [todolistId2]: [
//             {id: v1(), title: "Book", isDone: false},
//             {id: v1(), title: "Milk", isDone: true},
//         ],
//     }
//
//
// })
//
// test("Correct todolist (with corresponding tasks) should be added", () => {
//     // data
//     const newTodolistTitle: string = "New Todolist"
//     const newTodolistId = v1()
//     // const action: actionType = {type: "addTodolist", todolistTitle: newTodolistTitle}
//     const action: tasksActionType = addTodolistAC(newTodolistTitle, newTodolistId)
//
//     // action
//     const updatedTodolistsState = todolistsReducer(initialtodolistState, action)
//     const updatedTasksState = tasksReducer(initialTasksState, action)
//
//     // expectation
//     expect(updatedTodolistsState.length).toBe(3)
//     expect(Object.keys(updatedTasksState).length).toBe(3)
//     expect(updatedTodolistsState[0].id).toBe(Object.keys(updatedTasksState)[2])
//
// })
//
// test("Correct todolist (with corresponding tasks) should be deleted", () => {
//     // data
//     const action: tasksActionType = remTodolistAC(todolistId2)
//
//     // action
//     const updatedTodolistsState = todolistsReducer(initialtodolistState, action)
//     const updatedTasksState = tasksReducer(initialTasksState, action)
//
//     // expectation
//     expect(updatedTodolistsState.length).toBe(1)
//     expect(Object.keys(updatedTasksState).length).toBe(1)
//     expect(updatedTasksState[todolistId1]).toBeDefined()
//     expect(updatedTasksState[todolistId2]).not.toBeDefined()
//
// })

import {TodolistFromAPIType} from "../api/api";
import {tasksActionType, tasksReducer} from "./tasksReduser";
import {setTodolistsAC, todolistsReducer} from "./todolistsReduser";

test("Correct todolists should be added", () => {

    // DATA

    let todolistsFromAPI: TodolistFromAPIType[] = [
        {
            id: "c120798c-3062-4b8a-a1c9-0de81f13d59b",
            title: "Changed Title by Api",
            addedDate: "2024-01-28T09:47:55.237",
            order: -4
        },
        {
            id: "6c10c194-f375-4b56-9a6a-af24aaca228b",
            title: "New Todolist",
            addedDate: "2024-01-28T09:47:39.72",
            order: -3
        }
    ]

    const action: tasksActionType = setTodolistsAC(todolistsFromAPI)

    // ACTIONS

    const TodolistsStateSet = todolistsReducer([], action)
    const TasksStateSet = tasksReducer({}, action)


    // EXPECTATIONS

    expect(TodolistsStateSet.length).toBe(2)
    expect(Object.keys(TasksStateSet).length).toBe(2)
    expect(TodolistsStateSet[0].id).toBe(Object.keys(TasksStateSet)[0])
    expect(TodolistsStateSet[1].id).toBe(Object.keys(TasksStateSet)[1])
    expect(TodolistsStateSet[0]).toStrictEqual({
        id: "c120798c-3062-4b8a-a1c9-0de81f13d59b",
        title: "Changed Title by Api",
        addedDate: "2024-01-28T09:47:55.237",
        order: -4,
        todolistTitle:"Changed Title by Api",
        filterCond: "All"
    })
    expect(TodolistsStateSet[1]).toStrictEqual({
        id: "6c10c194-f375-4b56-9a6a-af24aaca228b",
        title: "New Todolist",
        addedDate: "2024-01-28T09:47:39.72",
        order: -3,
        todolistTitle:"New Todolist",
        filterCond: "All"
    })

})