import { Setter, JSX, createSignal } from "solid-js";
import { Task, Tasks } from "./App";
import { TodoList, TodoListProps } from './TodoList';

export interface AddTaskProps {
    setTask: Setter<Task[]>;
}

const emptyTask: Task = { taskName: "" };

export function AddTask(props: AddTaskProps) {
    const [newTask, setNewTask] = createSignal(emptyTask);
    const addTask: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => { // click handler
        event.preventDefault(); // prevent default form behaviour of sending a POST request
        props.setTask((tasks) => [...tasks, newTask()]); // keeps previous list of tasks and adds new task
        setNewTask(emptyTask); // clears input field
        console.log("this works");
        console.log(Tasks);
    };

    return (
        <form>
            <div>
                <label for="newTask">Add new task: </label>
                <input 
                    id="newTask" 
                    value={newTask().taskName} 
                    onInput={(e) => {
                        setNewTask({ ...newTask(), taskName: e.currentTarget.value });
                        console.log("yay");
                        console.log(Tasks);
                    }}
                />
            </div>
            <button type="submit" onClick={addTask}>Add Task</button>
        </form>
    );
}