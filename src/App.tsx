import { Component, createEffect, createSignal } from 'solid-js';
import { createStore, SetStoreFunction, Store } from 'solid-js/store';
import { TodoList } from './TodoList';
import { AddTask } from './AddTask';

import logo from './logo.svg';
import styles from './App.module.css';

export type Task = {
    taskName: string;
    completed: boolean;
    taskID: number;
};

export const emptyTask: Task = { taskName: "", completed: false, taskID: 0 };

export function createLocalStore<T extends object>(initState: T): 
    [Store<T>, SetStoreFunction<T>] {
        const [state, setState] = createStore(initState);
        if (localStorage.storageObjects) setState(JSON.parse(localStorage.storageObjects));
        createEffect(() => (localStorage.storageObjects = JSON.stringify(state)));
        return [state, setState];
    }

// NOTE: use of local storage is vulnerable to XSS https://dev.to/rdegges/please-stop-using-local-storage-1i04

let Tasks: Task[] = [];

function MakeTasks() {
    let localStorageTasks = JSON.parse(localStorage.getItem('storageObjects')!);
    if (localStorage.length > 0) {
        for (let i = 0; i < localStorageTasks.length; i++) {
            let object: Task = {
                taskName: localStorageTasks[i]['taskName'],
                completed: localStorageTasks[i]['completed'],
                taskID: i
            }
            Tasks.push(object);
        }
        return Tasks;
    } else {
        let Tasks: Task[] = [
            { taskName: "Do work", completed: true, taskID: 0 },
            { taskName: "Test", completed: false, taskID: 1 }
        ];
        localStorage.setItem('storageObjects', JSON.stringify(Tasks));
        return Tasks;
    }
}

function MakeTodoList() {   
    const [tasks, setTask] = createSignal(MakeTasks());
    return (
        <div>  
            <h1>Todo List</h1>
            <TodoList tasks={tasks()} setTasks={setTask} />
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
