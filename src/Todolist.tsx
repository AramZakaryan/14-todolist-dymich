import React, {useCallback, useEffect} from "react";
import {CondType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {useDispatch} from "react-redux";
import {setTasksAC} from "./state/tasksReduser";
import {TaskFromAPIType} from "./api/api";
import {AnyAction, Dispatch} from "redux";
import {setTasksTC} from "./state/thunks";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistId: string
    todolistTitle: string
    tasks: TaskType[]
    removeTask: (removeTaskId: string, todolistId: string) => void
    changeFilterCond: (cond: CondType, todolistId: string) => void
    addTask: (newTaskTitle: string, todolistId: string) => void
    changeStatus: (changeTaskID: string, changeTaskIsDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filterCond: CondType
    changeTaskTitle: (todollistId: string, taskId: string, changedTaskTitle: string) => void
    changeTodolistTitle: (todollistId: string, changedTodolistTitle: string) => void
}


export const Todolist = React.memo(
    (props: TodolistPropsType) => {

        const {
            todolistId,
            changeFilterCond,
            addTask,
            removeTodolist,
            changeTodolistTitle,
        }
            = props

        const dispatch:Dispatch<AnyAction> | any= useDispatch()

        useEffect(() => {

            dispatch(setTasksTC(todolistId))

        }, [])

        const AllBtnOnClickHandler = useCallback(() =>
                changeFilterCond("All", todolistId)
            , [changeFilterCond, todolistId])

        const ActiveBtnOnClickHandler = useCallback(() =>
                changeFilterCond("Active", todolistId)
            , [changeFilterCond, todolistId])

        const CompletedBtnOnClickHandler = useCallback(() =>
                changeFilterCond("Completed", todolistId)
            , [changeFilterCond, todolistId])

        const removeTodolistHandler = useCallback(() =>
                removeTodolist(todolistId)
            , [removeTodolist, todolistId])

        const addTaskIntermediary = useCallback((newTaskTitle: string) =>
                addTask(newTaskTitle, todolistId)
            , [addTask, todolistId])

        const changeTodolistTitleIntermediary = useCallback((todolistTitle: string) =>
                changeTodolistTitle(todolistId, todolistTitle)
            , [changeTodolistTitle, todolistId])

        let filteredTasks: TaskType[]   // tasks to be shown (after filtration)
        props.filterCond === "Active" ?
            filteredTasks = props.tasks.filter(el => !el.isDone)
            : props.filterCond === "Completed" ?
                filteredTasks = props.tasks.filter(el => el.isDone)
                : filteredTasks = props.tasks

        return (
            <div>
                <h3>
                    <EditableSpan updatedTitle={props.todolistTitle}
                                  changeSpanContent={changeTodolistTitleIntermediary}/>
                    <IconButton onClick={removeTodolistHandler}>
                        <Delete color={"primary"}/>
                    </IconButton>
                </h3>

                <AddItemForm addItem={addTaskIntermediary}/>

                {filteredTasks.map((t) => <Task
                        key={t.id}
                        todolistId={props.todolistId}
                        removeTask={props.removeTask}
                        changeStatus={props.changeStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        task={t}
                    />
                )
                }

                <div>
                    <Button color={"inherit"}
                            onClick={AllBtnOnClickHandler}
                            variant={props.filterCond === "All" ? "contained" : "text"}
                    > All
                    </Button>
                    <Button color={"primary"}
                            onClick={ActiveBtnOnClickHandler}
                            variant={props.filterCond === "Active" ? "contained" : "text"}
                    >Active
                    </Button>
                    <Button color={"error"}
                            onClick={CompletedBtnOnClickHandler}
                            variant={props.filterCond === "Completed" ? "contained" : "text"}

                    >Completed
                    </Button>
                </div>

            </div>
        )
    }
)

