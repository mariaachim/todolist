import type { Component } from 'solid-js';
import { TodoList } from './TodoList';

import logo from './logo.svg';
import styles from './App.module.css';

function App() {
    return (
        <div>  
            <h1>Todo List</h1>
            <TodoList />
        </div>
    );
};

export default App;
