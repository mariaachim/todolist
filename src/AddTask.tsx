import { Setter, JSX, createSignal, createEffect } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";
import { Task, createLocalStore } from "./App";

export interface AddTaskProps {
    setTask: Setter<Task[]>;
}

const emptyTask: Task = { taskName: "", completed: false, taskID: 0 };

export function AddTask(props: AddTaskProps) {
    const [newTask, setNewTask] = createSignal(emptyTask);
    const [storageObjects, setStorageObjects] = createLocalStore<Task[]>([]);
    const addTask: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => { // click handler
        if (newTask().taskName != "") {
            setStorageObjects(storageObjects.length, {
                taskName: newTask().taskName,
                completed: false
            });
            event.preventDefault(); // prevent default form behaviour of sending a POST request
            props.setTask((tasks) => [...tasks, newTask()]); // keeps previous list of tasks and adds new task
            setNewTask(emptyTask); // clears input field
        }
    };

    return (
        <form>
            <div>
                <label for="newTask">Add new task: </label>
                <input 
                    id="newTask" 
                    value={newTask().taskName} 
                    onInput={(e) => {
                        setNewTask({ ...newTask(), taskName: e.currentTarget.value, completed: false });
                    }}
                />
            </div>
            <button type="submit" onClick={addTask}>Add Task</button>
        </form>
    );
}