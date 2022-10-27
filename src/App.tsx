import { Component, createEffect, createSignal } from 'solid-js';
import { createStore, SetStoreFunction, Store } from 'solid-js/store';
import { TodoList } from './TodoList';
import { AddTask } from './AddTask';

import logo from './logo.svg';
import styles from './App.module.css';

export type Task = {
    taskName: string;
    completed: boolean;
};

export function createLocalStore<T extends object>(initState: T): 
    [Store<T>, SetStoreFunction<T>] {
        const [state, setState] = createStore(initState);
        if (localStorage.storageObjects) setState(JSON.parse(localStorage.storageObjects));
        createEffect(() => (localStorage.storageObjects = JSON.stringify(state)));
        return [state, setState];
}

// NOTE! use of localStorage is vulnerable to XSS attacks - https://dev.to/rdegges/please-stop-using-local-storage-1i04
// perhaps use sessionStorage?


let Tasks: Task[] = [
    { taskName: "Do work", completed: false },
    { taskName: "Test", completed: false }
];

function MakeTasks() {
    if (localStorage.length > 0) {
        let localStorageTasks = JSON.parse(localStorage.getItem('storageObjects')!);
        for (let i = 0; i < localStorageTasks.length; i++) {
            let object: Task = {
                taskName: localStorageTasks[i]['taskName'],
                completed: localStorageTasks[i]['completed']
            }
            console.log(object);
            Tasks.push(object);
        }
        return Tasks;
    } else {
        let Tasks: Task[] = [
            { taskName: "Do work", completed: false },
            { taskName: "Test", completed: false }
        ];
        return Tasks;
    }
}

function MakeTodoList() {   
    let tasksForFunction: Task[] = MakeTasks(); // not used yet
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
