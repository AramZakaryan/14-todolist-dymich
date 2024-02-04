import type { Meta, StoryObj } from '@storybook/react';

import { AddItemForm } from './AddItemForm';

const meta = {
    title: 'TodolistProject/AddItemForm',
    component: AddItemForm,
} satisfies Meta<typeof AddItemForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AddItemFormBaseExample: Story = {
    argTypes:{
        addItem:{action:"'addItem' run with 'newTaskTitle'"}
    },
};

