import { createEffect, createSignal } from 'solid-js';
import { createStore, SetStoreFunction, Store } from 'solid-js/store';
import { TodoList } from './TodoList';
import { AddTask } from './AddTask';

import logo from './todolist-logo.png'; // https://freeicons.io/education/checklist-clipboard-tasks-todo-icon-38370
import styles from './App.module.css';

export type Task = {
    taskName: string;
    completed: boolean;
};

export const emptyTask: Task = { taskName: "", completed: false };

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
            }
            Tasks.push(object);
        }
        return Tasks;
    } else {
        return Tasks;
    }
}

function MakeTodoList() {   
    const [tasks, setTask] = createSignal(MakeTasks());
    return (
        <div>
            <header>
                <img src={logo} alt="logo" />
                <h1>Todo List</h1>
            </header>

            <TodoList tasks={tasks()} setTasks={setTask} />
            <AddTask setTask={setTask} />

            <footer>
                <a href="https://github.com/mariaachim/todolist">GitHub repo link</a>
            </footer>
        </div>
    );
}

function App() {
    return (
        <MakeTodoList />
    );
};

export default App;
