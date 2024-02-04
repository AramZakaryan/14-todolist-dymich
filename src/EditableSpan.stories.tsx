import type {Meta, StoryObj} from '@storybook/react';

import {EditableSpan} from "./EditableSpan";

const meta = {
    title: 'TodolistProject/EditableSpan',
    component: EditableSpan,
    argTypes: {
        changeSpanContent: {action: "Span Content changed. newTitle"}
    }
} satisfies Meta<typeof EditableSpan>;

export default meta;

type Story = StoryObj<typeof meta>;


export const EditableSpanExample: Story = {
    args: {
        updatedTitle: "start value"
    }
};
