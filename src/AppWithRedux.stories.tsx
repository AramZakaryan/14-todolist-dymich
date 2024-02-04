import type {Meta, StoryObj} from '@storybook/react';

import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

const meta = {
    title: 'TodolistProject/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} satisfies Meta<typeof AppWithRedux>;

export default meta;

type Story = StoryObj<typeof meta>;


export const AppWithReduxExample: Story = {
    parameters: {
        docs: {sources:{
            language:"tsx"
            }}
    }
}