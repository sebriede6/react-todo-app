import { create } from 'zustand';

export const useTodoStore = create((set, get) => ({
  todos: [],
  filter: 'all', 
  
  
  setTodos: (todos) => set({ todos }),

  
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), text, done: false }],
    })),

  
  toggleComplete: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      ),
    })),

  
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  
  updateTodo: (id, newText) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      ),
    })),

  
  setFilter: (filter) => set({ filter }),

  
  getFilteredTodos: () => {
    const { todos, filter } = get();
    switch (filter) {
      case 'completed':
        return todos.filter((todo) => todo.done);
      case 'active':
        return todos.filter((todo) => !todo.done);
      default:
        return todos;
    }
  },
}));
