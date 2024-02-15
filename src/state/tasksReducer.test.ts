import {allTasksType, CondType, todolistType} from "../App";
import {v1} from "uuid";
import {
    tasksActionType,
    addTaskAC,
    updateTaskAC,
    removeTaskAC,
    tasksReducer, setTasksAC
} from "./tasksReduser";
import {TaskType} from "../Todolist";
import {TaskFromAPIType} from "../api/api";

let initialState: allTasksType
let todolistId1: string
let todolistId2: string
let taskId1_1: string
let taskId1_2: string

beforeEach(() => {

    todolistId1 = v1()
    todolistId2 = v1()

    taskId1_1 = v1()
    taskId1_2 = v1()

    initialState = {
        [todolistId1]: [
            {id: v1(), title: "CSS & HTML", isDone: false},
            {id: taskId1_1, title: "JS", isDone: false},
            {id: taskId1_2, title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
        ],
    }

})

test("Correct task should be removed", () => {

    // DATA

    const action: tasksActionType = removeTaskAC(todolistId1, taskId1_1)

    // ACTIONS

    const updatedState: allTasksType = tasksReducer(initialState, action)

    // EXPECTATIONS

    expect(updatedState[todolistId1].length).toBe(3)
    expect(updatedState[todolistId2].length).toBe(2)
    expect(updatedState[todolistId1].every(t => t.id !== taskId1_1)).toBeTruthy()

})

test("Correct task should be added", () => {

    // DATA

    const taskFromAPI: TaskFromAPIType = {
        id: "d96ccc97-14c6-4197-b775-70b2bcea425f",
        title: "New Task 1",
        description: null,
        todoListId: "c120798c-3062-4b8a-a1c9-0de81f13d59b",
        order: -1,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: "2024-01-28T17:14:09.183"
    }

    const todolistId:string = taskFromAPI.todoListId

    const action = addTaskAC(todolistId, taskFromAPI)

    // ACTIONS

    const stateUpdated = tasksReducer({[todolistId]:[] } as allTasksType,action)

    // EXPECTATIONS

    expect(stateUpdated[todolistId].length).toBe(1)
    expect(stateUpdated[todolistId][0]).toStrictEqual({
        id: "d96ccc97-14c6-4197-b775-70b2bcea425f",
        title: "New Task 1",
        description: null,
        todoListId: "c120798c-3062-4b8a-a1c9-0de81f13d59b",
        order: -1,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: "2024-01-28T17:14:09.183",
        isDone:false // !!!!!!!!!
    })

})

test("Correct task status should be changed", () => {

    // data
    const action: tasksActionType = updateTaskAC(todolistId1, taskId1_2, {isDone:true})

    // action
    const updatedState = tasksReducer(initialState, action)

    // expectation
    expect(updatedState[todolistId1][2].isDone).toBeTruthy()

})

test("Correct task title should be changed", () => {

    // data
    const newTitle = "New Title"
    const action: tasksActionType = updateTaskAC(todolistId1, taskId1_2, {title:newTitle})

    // action
    const updatedState = tasksReducer(initialState, action)

    // expectation
    expect(updatedState[todolistId1][2].title).toBe(newTitle)

})

test("Correct tasks should be set", () => {

    // DATA

    const tasksFromAPI: TaskFromAPIType[] = [
        {
            id: "d96ccc97-14c6-4197-b775-70b2bcea425f",
            title: "New Task 1",
            description: null,
            todoListId: "c120798c-3062-4b8a-a1c9-0de81f13d59b",
            order: -1,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null,
            addedDate: "2024-01-28T17:14:09.183"
        },
        {
            id: "8a0cd955-3201-4a11-a70b-332557403ed6",
            title: "New Task 2",
            description: null,
            todoListId: "c120798c-3062-4b8a-a1c9-0de81f13d59b",
            order: 0,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null,
            addedDate: "2024-01-28T17:14:04.4"
        }
    ]

    const todolistId = tasksFromAPI[0].todoListId

    const action: tasksActionType = setTasksAC(todolistId, tasksFromAPI)

    // action

    const TasksStateSet = tasksReducer({}, action)

    // expectation

    expect(TasksStateSet[todolistId].length).toBe(2)
    expect(TasksStateSet[todolistId][0]).toStrictEqual({
        id: "d96ccc97-14c6-4197-b775-70b2bcea425f",
        title: "New Task 1",
        description: null,
        todoListId: "c120798c-3062-4b8a-a1c9-0de81f13d59b",
        order: -1,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: "2024-01-28T17:14:09.183",
        isDone: false // !!!!!!!!!!
    })
    expect(TasksStateSet[todolistId][1]).toStrictEqual({
        id: "8a0cd955-3201-4a11-a70b-332557403ed6",
        title: "New Task 2",
        description: null,
        todoListId: "c120798c-3062-4b8a-a1c9-0de81f13d59b",
        order: 0,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: "2024-01-28T17:14:04.4",
        isDone: false // !!!!!!!!!!
    })
})


