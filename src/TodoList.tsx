import { createSignal, For } from 'solid-js';

type Task = {
    taskName: string;
    taskNum: number;
    done: boolean;
};

const initialTasks: Task[] = [
    { taskName: "Do work", taskNum: 1, done: false },
    { taskName: "Test", taskNum: 2, done: false }
];

const handler = (task: string) => (event: Event) => {
    initialTasks.push ({
        taskName: task,
        taskNum: Object.keys(initialTasks).length + 1,
        done: false
    });
    console.log(initialTasks);
};

export function TodoList() {
    const [tasks, setTasks] = createSignal(initialTasks);

    return (
        <><h2>Tasks completed: </h2><For each={tasks()}>
            {(task) => {
                return (
                    <div>
                        <input type="checkbox" id={task.taskNum.toString()} name={task.taskNum.toString()} value={task.done.toString()} />
                        <label for={task.taskNum.toString()}>{task.taskName}</label>
                    </div>
                );
            } }
        </For></>
    );
};

export function AddTask() {
    return (
        <div>
            <form>
                <label for="newTask">Add new task: </label>
                <input type="text" id="newTask" name="newTask" />
                <br />
                <button type="button">Add Task</button>
            </form>
        </div>
    )
};
