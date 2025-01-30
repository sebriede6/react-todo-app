import { useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useTodoStore } from './store/todoStore';
import './index.css';

const App = () => {
  const { todos, setTodos, addTodo, toggleComplete, removeTodo } = useTodoStore();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, [setTodos]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container mx-auto mt-2 min-h-screen flex justify-center items-center bg-gradient-to-bl from-[#0093E9] to-[#80D0C7]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <header className="bg-orange-500 p-4 shadow-md rounded-t-lg">
          <h3 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-[#4158D0] to-[#C850C0] bg-clip-text">
            Todo App
          </h3>
        </header>

        <main className="container mx-auto bg-white p-4 mt-6 rounded-lg shadow-md">
          <TodoForm addTodo={addTodo} />
          <TodoList todos={todos} toggleComplete={toggleComplete} removeTodo={removeTodo} />
        </main>

        <footer className="bg-white p-4 text-center text-sm text-gray-700 shadow-md mt-6 rounded-b-lg">
          © 2024 Todo App
        </footer>
      </div>
    </div>
  );
};

export default App;
