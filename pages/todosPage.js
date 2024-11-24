    import { useState, useEffect } from 'react';

    export default function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        async function fetchTodos() {
            try {
                const res = await fetch('/api/todos');
                if (!res.ok) {
                    throw new Error('Failed to fetch todos');
                }
                const data = await res.json();
                setTodos(data);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        }
        fetchTodos();
    }, []);
    

    const toggleTodo = async (id, completed) => {
        try {
        const res = await fetch(`/api/todos?id=${id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: !completed }),
        });

        if (res.ok) {
            setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !completed } : todo
            )
            );
        }
        } catch (error) {
        console.error('Failed to update todo:', error);
        }
    };

    return (
        <div>
        <h1>To-Do List</h1>
        {todos.length === 0 ? (
            <p>Loading...</p>
        ) : (
            <ul>
            {todos.map((todo) => (
                <li key={todo.id}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id, todo.completed)}
                />
                {todo.title}
                </li>
            ))}
            </ul>
        )}
        </div>
    );
    }
