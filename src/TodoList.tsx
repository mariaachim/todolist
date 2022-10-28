import { createSignal, For } from 'solid-js';
import { Task, createLocalStore } from './App';
import { AddTask } from './AddTask';
import { Properties } from 'solid-js/web';

export interface TodoListProps {
    tasks: Task[];
}

let localStorageTasks: string[] = []

export function TodoList(props: TodoListProps) {
    let totalTasks = props.tasks.length;
    let completedTasks = 0;
    props.tasks.forEach(function (task) {
        if (task.completed) {
            completedTasks ++;
        };
    });
    console.log(completedTasks);
    return (
        <><h2>Number of tasks: {totalTasks}</h2>
        <h2>Tasks competed: {completedTasks}</h2>
        <For each={props.tasks}>
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