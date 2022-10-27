import { createSignal, For } from 'solid-js';
import { Task, createLocalStore } from './App';
import { AddTask } from './AddTask';

export interface TodoListProps {
    tasks: Task[];
}

let localStorageTasks: string[] = []

export function TodoList(props: TodoListProps) {
    const totalTasks = () => props.tasks.length;
    return (
        <><h2>Number of tasks: {totalTasks()}</h2><For each={props.tasks}>
            {(task, i) => {
                return (
                    <div>
                        <input type="checkbox" id={i().toString()} name="task" />
                        <label for={i().toString()}>{task.taskName}</label>
                    </div>
                );
            }}
        </For></>
    );
};