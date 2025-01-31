import { useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useTodoStore } from './store/todoStore';

const App = () => {
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);
  const setTodos = useTodoStore((state) => state.setTodos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleComplete = useTodoStore((state) => state.toggleComplete);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const setFilter = useTodoStore((state) => state.setFilter);


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (Array.isArray(storedTodos)) {
      setTodos(storedTodos);
    } else {
      setTodos([]); 
    }
  }, [setTodos]);

  
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  
  const filteredTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter((todo) => todo.done);
      case 'active':
        return todos.filter((todo) => !todo.done);
      default:
        return todos;
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-[#100a0a] to-[#1af012] p-8 rounded-lg shadow-lg w-full sm:w-[600px]">
        <header className="bg-orange-500 p-4 shadow-md rounded-t-lg">
          <h3 className="text-3xl font-bold text-center text-transparent bg-gradient-to-r from-[#100a0a] to-[#1af012] bg-clip-text">
            Todo App
          </h3>
        </header>

        <main className="container mx-auto bg-gray-200 p-4 mt-6 rounded-lg shadow-md">
          <TodoForm addTodo={addTodo} />
          <div className="flex justify-center space-x-4 mb-4">
            <button onClick={() => setFilter('all')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Alle</button>
            <button onClick={() => setFilter('active')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Offene</button>
            <button onClick={() => setFilter('completed')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Erledigte</button>
          </div>
          <TodoList todos={filteredTodos()} toggleComplete={toggleComplete} removeTodo={removeTodo} />
        </main>

        <footer className="bg-white p-4 text-center text-sm text-gray-700 shadow-md mt-6 rounded-b-lg">
          © Sebs Todo App
        </footer>
      </div>
    </div>
  );
};

export default App;
