import { For, Setter } from 'solid-js';
import { Task } from './App';

export interface TodoListProps {
    tasks: Task[];
    setTasks: Setter<Task[]>;
}

export function TodoList(props: TodoListProps) {

    function SetTotalTasks() {
        let totalTasks = props.tasks.length;
        return totalTasks
    }

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
        <><h2>Number of tasks: {SetTotalTasks()}</h2>
        <h2>Tasks completed: {SetTasksCompleted()}</h2>
        <For each={props.tasks}>
            {(task) => {
                return (
                    <div>
                        <input type="checkbox" name="task" checked={task.completed} onChange={() => {
                            props.setTasks((tasks) => {  
                                let newList = tasks.map((oldTask) =>
                                    task === oldTask ? { ...oldTask, completed: !oldTask.completed } : oldTask
                                );
                                localStorage.setItem('storageObjects', JSON.stringify(newList));
                                SetTasksCompleted();
                                return newList;
                            }); 
                        }} />
                        <label>{task.taskName}</label>
                        <button type="button" class="button remove" onclick={() => {
                            props.setTasks((tasks) => {
                                let newList = tasks.filter((oldTask) =>
                                    (task !== oldTask)
                                );
                                localStorage.setItem('storageObjects', JSON.stringify(newList));
                                SetTotalTasks();
                                SetTasksCompleted();
                                return newList;
                            });
                        }}>x</button>
                        <p></p>
                    </div>
                );
            }}
        </For></>
    );
};