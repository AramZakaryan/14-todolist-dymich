import React, {useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {AddCircleOutline, ControlPoint, Delete} from "@mui/icons-material";

export type AddItemFormProps = {
    addItem: (newTaskTitle: string) => void
}
export const AddItemForm = React.memo((props:AddItemFormProps) => {

    console.log("AddItemForm runs")

    const [inpValue,
        setInpValue]
        = useState("")

    const [error,
        setError]
        = useState<string | null>(null)

    const inpOnChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setInpValue(ev.currentTarget.value)
        if (error) {
            setError(null)
        }
    }

    const enterInpOnKeyDownHandler = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        if (ev.code === "Enter") {
            // if (inpValue.trim() !== "") {
            //     props.addItem(inpValue)
            //     setInpValue("")
            // } else if (!error) {
            //     setError("Title is required!!!")
            // }
            AddBtnOnClickHandler()
        }
    }

    const AddBtnOnClickHandler = () => {
        // if (inpValue.trim() !== "") {
        if (inpValue.trim()) {
            props.addItem(inpValue)
            setInpValue("")
        } else if (!error) {
            setError("Title is required!!!")
        }
    }

    return (<div>
        <TextField variant={"outlined"}
                   label={"Type Value"}
                   value={inpValue}
                   onChange={inpOnChangeHandler}
                   onKeyDown={enterInpOnKeyDownHandler}
                   className={error ? "error" : ""}
                   error={!!error}
                   helperText={error}
        />
        <IconButton
            color={"primary"}
            onClick={() => AddBtnOnClickHandler()}
        >
            <ControlPoint/>
        </IconButton>
    </div>)
})