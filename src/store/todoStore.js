import { create } from 'zustand';
   export const useTodoStore = create((set) => ({
     todos: [],
     filter: 'all',
     setTodos: (todos) => set({ todos }),
     addTodo: (title, dueDate) =>
      set((state) => ({
        todos: [...state.todos, { id: Date.now(), title, dueDate: dueDate.toISOString(), done: false }],
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
           todo.id === id ? { ...todo, title: newText } : todo
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