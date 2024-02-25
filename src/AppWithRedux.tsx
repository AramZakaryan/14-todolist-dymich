import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton, Paper,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from '@mui/icons-material'
import {
    addTodolistAC,
    changeFilterCondAC,
    changeTodolistTitleAC,
    remTodolistAC, setTodolistsAC, todolistId1, todolistId2,
} from "./state/todolistsReduser";
import {addTaskAC, updateTaskAC, removeTaskAC, setTasksAC} from "./state/tasksReduser";
import {useDispatch, useSelector} from "react-redux";
import {roofReducerType} from "./state/store";
import {TaskFromAPIType, TodolistFromAPIType} from "./api/api";
import {AnyAction, Dispatch} from "redux";
import {
    addTaskTC,
    addTodolistTC, AllActionsType,
    changeTodolistTitleTC,
    removeTaskTC,
    removeTodolistTC,
    setTasksTC,
    setTodolistsTC, updateTaskTC
} from "./state/thunks";
import {ThunkDispatch} from "redux-thunk";


export type CondType = "All" | "Active" | "Completed"

export type allTasksType = {
    [key: string]: TaskType[]
}

export type todolistType = {
    id: string
    todolistTitle: string
    filterCond: CondType
}


const AppWithRedux = React.memo(() => {


        const dispatch: ThunkDispatch<roofReducerType, unknown, AllActionsType> = useDispatch()

        useEffect(() => {
            dispatch(setTodolistsTC())
        }, [])


        const todolists = useSelector<roofReducerType, todolistType[]>(state => state.todolists)

        const allTtasks = useSelector<roofReducerType, allTasksType>(state => state.tasks)

        const removeTask = useCallback((removeTaskId: string, todolistId: string) =>
                // dispatch(removeTaskAC(todolistId, removeTaskId))
                dispatch(removeTaskTC(todolistId, removeTaskId))
            , [dispatch])


        const addTask = useCallback((newTaskTitle: string, todolistId: string) =>
                dispatch(addTaskTC(todolistId, newTaskTitle))
            // dispatch(addTaskAC(todolistId, newTaskTitle))
            , [dispatch])


        const changeTaskStatus = useCallback((changeTaskID: string, changeTaskIsDone: boolean, todolistId: string) =>
                dispatch(updateTaskTC(todolistId, changeTaskID, {status: changeTaskIsDone ? 2 : 0}))
            , [dispatch])


        const changeTaskTitle = useCallback((todolistId: string, taskId: string, changedTaskTitle: string) =>
                dispatch(updateTaskTC(todolistId, taskId, {title: changedTaskTitle}))
            , [dispatch])


        const changeFilterCond = useCallback((cond: CondType, todolistId: string) =>
                dispatch(changeFilterCondAC(todolistId, cond))
            , [dispatch])


        const addTodolist = useCallback((title: string) =>
                dispatch(addTodolistTC(title))
            , [dispatch])

        const removeTodolist = useCallback((todolistId: string) =>
                // dispatch(remTodolistAC(todolistId))
                dispatch(removeTodolistTC(todolistId))
            , [dispatch])


        const changeTodolistTitle = useCallback((todolistId: string, changedTodolistTitle: string) =>
                // dispatch(changeTodolistTitleAC(todolistId, changedTodolistTitle))
                dispatch(changeTodolistTitleTC(todolistId, changedTodolistTitle))
            , [dispatch])


        return (
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Grid container style={{padding: "20px"}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={3}>
                        {todolists.map(el => {
                                return (
                                    <Grid item key={el.id}>
                                        <Paper style={{padding: "10px"}}>
                                            <Todolist
                                                todolistId={el.id}
                                                todolistTitle={el.todolistTitle}
                                                // tasks={filteredTasks}
                                                tasks={allTtasks[el.id]}
                                                removeTask={removeTask}
                                                changeFilterCond={changeFilterCond}
                                                addTask={addTask}
                                                changeStatus={changeTaskStatus}
                                                filterCond={el.filterCond}
                                                removeTodolist={removeTodolist}
                                                changeTaskTitle={changeTaskTitle}
                                                changeTodolistTitle={changeTodolistTitle}
                                            />
                                        </Paper>
                                    </Grid>
                                )
                            }
                        )}
                    </Grid>
                </Container>
            </div>
        );
    }
)

export default AppWithRedux;


