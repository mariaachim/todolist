import { createSignal, For, JSX, Setter } from 'solid-js';
import { Task, createLocalStore, emptyTask } from './App';
import { AddTask } from './AddTask';
import { Properties } from 'solid-js/web';

export interface TodoListProps {
    tasks: Task[];
    setTasks: Setter<Task[]>;
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
        <h2>Tasks completed: {completedTasks}</h2>
        <For each={props.tasks}>
            {(task) => {
                return (
                // TODO: add button to remove task from list
                // BUG: does not update "tasks completed"
                    <div>
                        <input type="checkbox" id={task.taskID.toString()} name="task" checked={task.completed} onChange={() => {
                            const [taskToUpdate, setTaskToUpdate] = createSignal(props.tasks)
                            props.setTasks((tasks) => {
                            
                                const newList = tasks.map((oldTask) =>
                                    task === oldTask ? { ...oldTask, completed: !oldTask.completed } : oldTask
                                );
                                console.log("changed")
                                localStorage.setItem('storageObjects',JSON.stringify(newList));
                                completedTasks++;
                                console.log(newList);
                                return newList;
                            }); 
                        }} />
                        <label for={task.taskID.toString()}>{task.taskName}</label>
                    </div>
                );
            }}
        </For></>
    );
};