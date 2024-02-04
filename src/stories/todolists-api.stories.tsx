import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsAPI, UpdateTaskType} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists().then(response => {
            setState(response.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolis("NewNewNew Todolist")
            .then(response => {
                    setState(response.data)
                }
            )

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.deleteTodolist("5fddaf95-806e-4e7e-922e-3695fa1b4168")
            .then(response => setState(response.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.updateTodolist("c120798c-3062-4b8a-a1c9-0de81f13d59b", "Offff Todolist")
            .then(response => setState(response.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistIdValue, setTodolistIdValue] = useState<string>("")

    // useEffect(() => {
    //     todolistsAPI.getTasks("c120798c-3062-4b8a-a1c9-0de81f13d59b")
    //         .then(response => {
    //             setState(response.data.items)
    //         })
    // }, [])

    const getTodolistsHandler = () => {
        todolistsAPI.getTasks(todolistIdValue)
            .then(response => {
                setState(response.data.items)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <br/>
            <br/>
            <input placeholder={"todolistId"}
                   value={todolistIdValue}
                   onChange={(ev) => setTodolistIdValue(ev.currentTarget.value)}
            />
            <br/>
            <button onClick={getTodolistsHandler}
            >Get Todolists
            </button>
        </div>
    )
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistIdValue, setTodolistIdValue] = useState<string>("")
    const [taskTitleValue, setTaskTitleValue] = useState<string>("")

    // useEffect(() => {
    //     todolistsAPI.createTask("c120798c-3062-4b8a-a1c9-0de81f13d59b", "New Task")
    //         .then(response => {
    //             setState(response.data)
    //         })
    // }, [])

    const createTaskHandler = () => {
        todolistsAPI.createTask(todolistIdValue, taskTitleValue)
                .then(response => {
                    setState(response.data)
                })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <br/>
            <br/>
            <input placeholder={"todolistId"}
                   value={todolistIdValue}
                   onChange={(ev) => setTodolistIdValue(ev.currentTarget.value)}
            />
            <br/>
            <input placeholder={"New TaskTitle"}
                   value={taskTitleValue}
                   onChange={(ev) => setTaskTitleValue(ev.currentTarget.value)}
            />
            <br/>
            <button onClick={createTaskHandler}
            >Create Task Title
            </button>
        </div>
    )
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistIdValue, setTodolistIdValue] = useState<string>("")
    const [taskIdValue, setTaskIdValue] = useState<string>("")

    const deleteTaskHandler = () => {
        todolistsAPI.deleteTask(todolistIdValue, taskIdValue)
            .then(response => {
                setState(response.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <br/>
            <br/>
            <input placeholder={"todolistId"}
                   value={todolistIdValue}
                   onChange={(ev) => setTodolistIdValue(ev.currentTarget.value)}
            />
            <br/>
            <input placeholder={"taskId"}
                   value={taskIdValue}
                   onChange={(ev) => setTaskIdValue(ev.currentTarget.value)}
            />
            <br/>
            <button onClick={deleteTaskHandler}
            >Delete Task
            </button>
        </div>
    )
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistIdValue, setTodolistIdValue] = useState<string>("")
    const [taskIdValue, setTaskIdValue] = useState<string>("")
    const [taskTitleValue, setTaskTitleValue] = useState<string>("")
    // useEffect(() => {
    //     todolistsAPI.updateTask("c120798c-3062-4b8a-a1c9-0de81f13d59b",
    //         "b1ec9ce3-aadb-4a6f-87e9-d02b7d393d08",
    //         {
    //             title: "VabsheVabshe new Title !!!",
    //             description: null,
    //             status: 0,
    //             priority: 1,
    //             startDate: null,
    //             deadline: "2024-01-29T15:20:16.307"
    //         } )
    //         .then(response => {
    //             setState(response)
    //         })
    // }, [])

    const updateTaskHandler = () => {
        todolistsAPI.updateTask(todolistIdValue,
            taskIdValue,
            {
                title: taskTitleValue,
                description: null,
                status: 0,
                priority: 1,
                startDate: null,
                deadline: "2024-01-29T15:20:16.307"
            } as UpdateTaskType)
            .then(response => {
                setState(response.data)
            })
    }

    return (
        <div>
            {JSON.stringify(state)}
            <br/>
            <br/>
            <input placeholder={"todolistId"}
                   value={todolistIdValue}
                   onChange={(ev) => setTodolistIdValue(ev.currentTarget.value)}
            />
            <br/>
            <input placeholder={"taskId"}
                   value={taskIdValue}
                   onChange={(ev) => setTaskIdValue(ev.currentTarget.value)}
            />
            <br/>
            <input placeholder={"New TaskTitle"}
                   value={taskTitleValue}
                   onChange={(ev) => setTaskTitleValue(ev.currentTarget.value)}
            />
            <br/>
            <button onClick={updateTaskHandler}
            >Update Task Title
            </button>
        </div>
    )
}

