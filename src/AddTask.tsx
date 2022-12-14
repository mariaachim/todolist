import { Setter, JSX, createSignal } from "solid-js";
import { Task, createLocalStore, emptyTask } from "./App";

export interface AddTaskProps {
    setTask: Setter<Task[]>;
}

export function AddTask(props: AddTaskProps) {
    const [newTask, setNewTask] = createSignal(emptyTask);
    const [storageObjects, setStorageObjects] = createLocalStore<Task[]>([]);
    const addTask: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => { // click handler
        if (newTask().taskName != "") {
            setStorageObjects(storageObjects.length, {
                taskName: newTask().taskName,
                completed: false,
            });
            event.preventDefault(); // prevent default form behaviour of sending a POST request
            props.setTask((tasks) => [...tasks, newTask()]); // keeps previous list of tasks and adds new task
            setNewTask(emptyTask); // clears input field
        }
    };
    
    const removeList: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
        localStorage.clear();
        event.preventDefault();
        props.setTask((tasks) => []);
    };

    return (
        <form>
            <div>
                <label for="newTask">Add new task: </label>
                <input
                    value={newTask().taskName} 
                    onInput={(e) => {
                        setNewTask({ ...newTask(), taskName: e.currentTarget.value });
                    }}
                />
            </div>

            <p class="divider" />
            <button type="submit" class="button add" onClick={addTask}>Add Task</button>
            <p class="button-divider" />
            <button type="button" class="button clear" onClick={removeList}>Clear List</button>
            <p class="divider" />

        </form>
    );
}