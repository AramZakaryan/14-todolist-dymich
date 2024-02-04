import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    todolistId: string
    task: TaskType
    removeTask: (removeTaskId: string, todolistId: string) => void
    changeStatus: (changeTaskID: string, changeTaskIsDone: boolean, todolistId: string) => void
    changeTaskTitle: (todollistId: string, taskId: string, changedTaskTitle: string) => void
}
export const Task = React.memo(
    (props: TaskPropsType) => {

        const {
            todolistId,
            task: {
                id,
                isDone,
                title
            },
            removeTask,
            changeStatus,
            changeTaskTitle
        } = props

        const removeBtnOnClickHandler = useCallback(() =>
                removeTask(id, todolistId)
            , [removeTask, id, todolistId])

        const statusInpOnChangeHandler = useCallback((ev: ChangeEvent<HTMLInputElement>) =>
                changeStatus(id, ev.currentTarget.checked, todolistId)
            , [changeStatus, id, todolistId])

        const changeTaskTitleTemprorary = useCallback((changedTaskTitle: string) =>
                changeTaskTitle(todolistId, id, changedTaskTitle)
            , [changeTaskTitle, todolistId, id])

        console.log("Task runs.")

        return (<>
            <div key={id} // props.task.id
                 className={isDone ? "is-done" : ""}> {/* props.task.isDone */}
                <Checkbox
                    onChange={statusInpOnChangeHandler}
                    checked={isDone} // props.task.isDone
                />
                <EditableSpan updatedTitle={title} // props.task.title
                              changeSpanContent={changeTaskTitleTemprorary}
                />
                <IconButton onClick={removeBtnOnClickHandler}>
                    <Delete color={"primary"}/>
                </IconButton>
            </div>
        </>)
    }
)