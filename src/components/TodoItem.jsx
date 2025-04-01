import PropTypes from "prop-types";
   import { useState } from "react";
   const TodoItem = ({ todo, toggleComplete, removeTodo }) => {
     const [isEditing, setIsEditing] = useState(false);
     const [newText, setNewText] = useState(todo.title);
     const handleUpdate = () => {
       // Hier kannst du eine Update-Funktion implementieren, wenn du möchtest
       // updateTodo(todo.id, newText);
       setIsEditing(false);
     };
     return (
       <li className="flex items-center justify-between py-2 border-t border-gray-300">
         <input
           type="checkbox"
           checked={todo.done}
           onChange={() => toggleComplete(todo.id)}
           className="cursor-pointer"
         />
         {isEditing ? (
           <input
             type="text"
             value={newText}
             onChange={(e) => setNewText(e.target.value)}
             className="mx-4 flex-1"
           />
         ) : (
           <span
             className={`mx-4 flex-1 break-words ${todo.done ? "line-through" : ""}`}
           >
             {todo.title} - Fällig am: {new Date(todo.dueDate).toLocaleString()}
           </span>
         )}
         <div className="flex space-x-2">
           {isEditing ? (
             <button
               onClick={handleUpdate}
               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
             >
               Speichern
             </button>
           ) : (
             <button
               onClick={() => setIsEditing(true)}
               className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
             >
               Bearbeiten
             </button>
           )}
           <button
             onClick={() => removeTodo(todo.id)}
             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
           >
             Löschen
           </button>
         </div>
       </li>
     );
   };
   TodoItem.propTypes = {
     todo: PropTypes.shape({
       id: PropTypes.number.isRequired,
       title: PropTypes.string.isRequired,
       dueDate: PropTypes.string.isRequired,
       done: PropTypes.bool.isRequired,
     }).isRequired,
     toggleComplete: PropTypes.func.isRequired,
     removeTodo: PropTypes.func.isRequired,
   };
   export default TodoItem;