import { Component, createSignal } from 'solid-js';
import { TodoList } from './TodoList';
import { AddTask, AddTaskProps } from './AddTask';

import logo from './logo.svg';
import styles from './App.module.css';

export type Task = {
    taskName: string;
};

export const Tasks: Task[] = [
    { taskName: "Do work" },
    { taskName: "Test" }
];

function MakeTodoList() {
    const [tasks, setTask] = createSignal(Tasks);
    return (
        <div>  
            <h1>Todo List</h1>
            <TodoList tasks={tasks()} />
            <AddTask setTask={setTask} />
        </div>
    );
}

function App() {
    return (
        <MakeTodoList />
    );
};

export default App;
