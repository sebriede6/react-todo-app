import PropTypes from 'prop-types';
   import TodoItem from './TodoItem';
   const TodoList = ({ todos, toggleComplete, removeTodo }) => {
     return (
       <ul>
         {todos.map((todo) => (
           <TodoItem
             key={todo.id}
             todo={todo}
             toggleComplete={toggleComplete}
             removeTodo={removeTodo}
           />
         ))}
       </ul>
     );
   };
   TodoList.propTypes = {
     todos: PropTypes.arrayOf(
       PropTypes.shape({
         id: PropTypes.number.isRequired,
         title: PropTypes.string.isRequired,
         dueDate: PropTypes.string.isRequired,
         done: PropTypes.bool.isRequired,
       })
     ).isRequired,
     toggleComplete: PropTypes.func.isRequired,
     removeTodo: PropTypes.func.isRequired,
   };
   export default TodoList;