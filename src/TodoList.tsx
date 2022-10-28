import { createSignal, For, JSX, Setter } from 'solid-js';
import { Task, createLocalStore, emptyTask } from './App';
import { AddTask } from './AddTask';
import { Properties } from 'solid-js/web';

export interface TodoListProps {
    tasks: Task[];
    setTasks: Setter<Task[]>;
}

export function TodoList(props: TodoListProps) {
    let totalTasks = props.tasks.length;

    function SetTasksCompleted() {
        let completedTasks = 0;
        props.tasks.forEach(function (task) {
            if (task.completed) {
                completedTasks ++;
            };
        });
        return completedTasks;
    }

    return (
        <><h2>Number of tasks: {totalTasks}</h2>
        <h2>Tasks completed: {SetTasksCompleted()}</h2>
        <For each={props.tasks}>
            {(task) => {
                return (
                // TODO: add button to remove task from list - change following taskID variables
                    <div>
                        <input type="checkbox" id={task.taskID.toString()} name="task" checked={task.completed} onChange={() => {
                            props.setTasks((tasks) => {  
                                let newList = tasks.map((oldTask) =>
                                    task === oldTask ? { ...oldTask, completed: !oldTask.completed } : oldTask
                                );
                                localStorage.setItem('storageObjects', JSON.stringify(newList));
                                SetTasksCompleted();
                                return newList;
                            }); 
                        }} />
                        <label for={task.taskID.toString()}>{task.taskName}</label>
                        <button type="button" onclick={() => {
                            /*props.setTasks((tasks) => {
                                let newList = tasks.map((oldTask) =>
                                    task === oldTask ? {} : oldTask
                                );
                                localStorage.setItem('storageObjects', JSON.stringify(newList));
                                SetTasksCompleted();
                                return newList;
                            });*/
                        }}>x</button>
                    </div>
                );
            }}
        </For></>
    );
};