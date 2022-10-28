import { createSignal, For } from 'solid-js';
import { Task, createLocalStore } from './App';
import { AddTask } from './AddTask';

export interface TodoListProps {
    tasks: Task[];
}

let localStorageTasks: string[] = []

export function TodoList(props: TodoListProps) {
    const totalTasks = () => props.tasks.length;
    return ( // TODO: show number of tasks completed
        <><h2>Number of tasks: {totalTasks()}</h2><For each={props.tasks}>
            {(task) => {
                return (
                // TODO: add button to remove task from list
                    <div>
                        { task.completed ? (
                            <input type="checkbox" id={task.taskID.toString()} name="task" checked />
                        ) : (
                            <input type="checkbox" id={task.taskID.toString()} name="task" />
                        )}
                        <label for={task.taskID.toString()}>{task.taskName}</label>
                    </div>
                );
            }}
        </For></>
    );
};