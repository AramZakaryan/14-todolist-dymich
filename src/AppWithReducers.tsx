import React from 'react';
import './App.css';


// export type CondType = "All" | "Active" | "Completed"
//
// export type allTasksType = {
//     [key: string]: TaskType[]
// }
//
// export type todolistType = {
//     id: string
//     todolistTitle: string
//     filterCond: CondType
// }

//
// function AppWithReducers() {
//
//     let todolistId1 = v1()
//     let todolistId2 = v1()
//
//     const [todolists, dispatchTodolists] =
//         useReducer(todolistsReducer,
//             [
//                 {id: todolistId1, todolistTitle: "What to learn?", filterCond: "All"},
//                 {id: todolistId2, todolistTitle: "What to buy?", filterCond: "All"}
//             ]
//         )
//
//
//     const [allTtasks, dispatchAllTasks] =
//         useReducer(tasksReducer,
//             {
//                 [todolistId1]: [
//                     {id: v1(), title: "CSS & HTML", isDone: false},
//                     {id: v1(), title: "JS", isDone: false},
//                     {id: v1(), title: "React", isDone: false},
//                     {id: v1(), title: "Redux", isDone: false}
//                 ],
//                 [todolistId2]: [
//                     {id: v1(), title: "Book", isDone: false},
//                     {id: v1(), title: "Milk", isDone: true},
//                 ],
//             })
//
//
//     const removeTask = (removeTaskId: string, todolistId: string) => {
//         dispatchAllTasks(removeTaskAC(todolistId, removeTaskId))
//
//         // let tasksFiltered =
//         //     allTtasks[todolistId].filter(el =>
//         //         el.id !== removeTaskId
//         //     )
//         //
//         // setAllTasks({...allTtasks, [todolistId]: tasksFiltered})
//
//     }
//
//     const addTask = (newTaskTitle: string, todolistId: string) => {
//         dispatchAllTasks(addTaskAC(todolistId, newTaskTitle))
//
//         // let newTask = {id: v1(), title: newTaskTitle, isDone: false}
//         //
//         // let TasksUpdated = [newTask, ...allTtasks[todolistId]]
//         //
//         // setAllTasks({...allTtasks, [todolistId]: TasksUpdated})
//     }
//
//
//     const changeTaskStatus = (changeTaskID: string, changeTaskIsDone: boolean, todolistId: string) => {
//         dispatchAllTasks(changeTaskStatusAC(todolistId, changeTaskID, changeTaskIsDone))
//
//         // let taskTobeChanged = allTtasks[todolistId].find(el => el.id === changeTaskID)
//         //
//         // if (taskTobeChanged) {
//         //     taskTobeChanged.isDone = changeTaskIsDone
//         //     setAllTasks({...allTtasks})
//         // }
//     }
//
//
//     const changeTaskTitle = (todolistId: string, taskId: string, changedTaskTitle: string) => {
//         dispatchAllTasks(changeTaskTitleAC(todolistId, taskId, changedTaskTitle))
//
//         // let taskToBeUptaded = allTtasks[todolistId].find(el => el.id === taskId)
//         //
//         // if (taskToBeUptaded) {
//         //     taskToBeUptaded.title = changedTaskTitle
//         //     setAllTasks({...allTtasks})
//         // }
//     }
//
//     const changeFilterCond = (cond: CondType, todolistId: string) => {
//         dispatchTodolists(changeFilterCondAC(todolistId, cond))
//
//         // let todolist =
//         //     todolists.find(el => el.id === todolistId)
//         // if (todolist) {
//         //     todolist.filterCond = cond
//         //     setTodolists([...todolists])
//         // }
//     }
//
//     const addTodolist = (title: string) => {
//         const action = addTodolistAC(title, v1())
//         dispatchTodolists(action)
//         dispatchAllTasks(action)
//         // let newTodolistId = v1()
//         // let newTodolist: todolistType = {id: newTodolistId, todolistTitle: title, filterCond: "All"}
//         // setTodolists([...todolists, newTodolist])
//         //
//         // setAllTasks({...allTtasks, [newTodolistId]: []})
//     }
//
//     const removeTodolist = (todolistId: string) => {
//         const action = remTodolistAC(todolistId)
//         dispatchTodolists(action)
//         dispatchAllTasks(action)
//
//         // let todolistsUpdated = todolists.filter(el => el.id !== todolistId)
//         //
//         // setTodolists(todolistsUpdated)
//         //
//         // delete allTtasks[todolistId]
//         // setAllTasks({...allTtasks})
//     }
//
//     const changeTodolistTitle = (todolistId: string, changedTodolistTitle: string) => {
//         dispatchTodolists(changeTodolistTitleAC(todolistId, changedTodolistTitle))
//
//         // let todlolistUpdated = todolists.find(el => el.id === todolistId)
//         //
//         // if (todlolistUpdated) {
//         //     todlolistUpdated.todolistTitle = changedTodolistTitle
//         //     setTodolists([...todolists])
//         // }
//     }
//
//
//     return (
//         <div className="App">
//
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton
//                         size="large"
//                         edge="start"
//                         color="inherit"
//                         aria-label="menu"
//                         sx={{mr: 2}}
//                     >
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
//                         News
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container>
//
//                 <Grid container style={{padding: "20px"}}>
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//                 <Grid container spacing={3}>
//
//                     {todolists.map(el => {
//                             let filteredTasks: Array<TaskType>   // tasks to be shown (after filtration)
//                             el.filterCond === "Active" ?
//                                 filteredTasks = allTtasks[el.id].filter(el => !el.isDone)
//                                 : el.filterCond === "Completed" ?
//                                     filteredTasks = allTtasks[el.id].filter(el => el.isDone)
//                                     : filteredTasks = allTtasks[el.id]
//
//                             return (
//                                 <Grid item >
//                                     <Paper style={{padding: "10px"}}>
//                                         <Todolist
//                                             key={el.id}
//                                             todolistId={el.id}
//                                             todolistTitle={el.todolistTitle}
//                                             tasks={filteredTasks}
//                                             removeTask={removeTask}
//                                             changeFilterCond={changeFilterCond}
//                                             addTask={addTask}
//                                             changeStatus={changeTaskStatus}
//                                             filterCond={el.filterCond}
//                                             removeTodolist={removeTodolist}
//                                             changeTaskTitle={changeTaskTitle}
//                                             changeTodolistTitle={changeTodolistTitle}
//                                         />
//                                     </Paper>
//                                 </Grid>
//                             )
//                         }
//                     )}
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
//
// export default AppWithReducers;
