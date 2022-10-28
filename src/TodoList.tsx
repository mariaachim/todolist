import { createSignal, For, JSX } from 'solid-js';
import { Task, createLocalStore, emptyTask } from './App';
import { AddTask } from './AddTask';
import { Properties } from 'solid-js/web';

export interface TodoListProps {
    tasks: Task[];
}

let localStorageTasks: string[] = []

export function TodoList(props: TodoListProps) {
    const [taskToUpdate, setTaskToUpdate] = createSignal(emptyTask);
    const updateTasks: JSX.EventHandler<HTMLInputElement, MouseEvent> = (event) => {
        //localStorage.setItem(storageObjects[taskToUpdate.taskID]('completed', JSON.stringify(true)));
        console.log("checked");
        event.preventDefault();
    };


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
                // TODO: change state of completed if checkbox is ticked
                    <div>
                        <input type="checkbox" id={task.taskID.toString()} name="task" onclick={updateTasks} checked={task.completed} />
                        <label for={task.taskID.toString()}>{task.taskName}</label>
                    </div>
                );
            }}
        </For></>
    );
};