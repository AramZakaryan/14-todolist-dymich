import type {Meta, StoryObj} from '@storybook/react';

import {Task} from "./Task";

const meta = {
    title: 'TodolistProject/Task',
    component: Task,
    argTypes: {
        removeTask: {action: 'Task removed [removeTaskId, todolistId]'},
        changeStatus: {action: 'Task status changed [changeTaskID, changeTaskIsDone, todolistId]'},
        changeTaskTitle: {action: 'Task title changed [todollistId, taskId, changedTaskTitle]'}
    }
} satisfies Meta<typeof Task>;

export default meta;

type Story = StoryObj<typeof meta>;


export const TaskExampleCompleted: Story = {
    args: {
        todolistId: "todolistId1",
        task: {
            id: "taskId1",
            isDone: true,
            title: "task 111"
        },
    },
};

export const TaskExampleActive: Story = {
    args: {
        todolistId: "todolistI2",
        task: {
            id: "taskId2",
            isDone: false,
            title: "task 222"
        },
    },
};
