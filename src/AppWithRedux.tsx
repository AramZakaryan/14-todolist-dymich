import React, {useCallback} from 'react';
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
    remTodolistAC,
} from "./state/todolistsReduser";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReduser";
import {useDispatch, useSelector} from "react-redux";
import {roofReducerType} from "./state/store";


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

        console.log("AppWithRedux runs")

        const dispatch = useDispatch()

        const todolists = useSelector<roofReducerType, todolistType[]>(state => state.todolists)

        const allTtasks = useSelector<roofReducerType, allTasksType>(state => state.tasks)

        const removeTask = useCallback((removeTaskId: string, todolistId: string) =>
                dispatch(removeTaskAC(todolistId, removeTaskId)),
            [dispatch])


        const addTask = useCallback((newTaskTitle: string, todolistId: string) =>
                dispatch(addTaskAC(todolistId, newTaskTitle))
            , [dispatch])


        const changeTaskStatus = useCallback((changeTaskID: string, changeTaskIsDone: boolean, todolistId: string) =>
                dispatch(changeTaskStatusAC(todolistId, changeTaskID, changeTaskIsDone))
            , [dispatch])


        const changeTaskTitle = useCallback((todolistId: string, taskId: string, changedTaskTitle: string) =>
                dispatch(changeTaskTitleAC(todolistId, taskId, changedTaskTitle))
            , [dispatch])


        const changeFilterCond = useCallback((cond: CondType, todolistId: string) =>
                dispatch(changeFilterCondAC(todolistId, cond))
            , [dispatch])


        const addTodolist = useCallback((title: string) =>
                dispatch(addTodolistAC(title, v1()))
            , [dispatch])

        const removeTodolist = useCallback(function (todolistId: string) {
                dispatch(remTodolistAC(todolistId))
            }
            , [dispatch])


        const changeTodolistTitle = useCallback((todolistId: string, changedTodolistTitle: string) =>
                dispatch(changeTodolistTitleAC(todolistId, changedTodolistTitle))
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