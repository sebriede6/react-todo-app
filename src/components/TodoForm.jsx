import { useState } from "react";
   import PropTypes from "prop-types";
   import "./TodoForm.css";
   const TodoForm = ({ addTodo }) => {
     const [input, setInput] = useState("");
     const [dueDate, setDueDate] = useState("");
     const [dueTime, setDueTime] = useState("");
     const handleSubmit = (e) => {
       e.preventDefault();
       if (input.trim()) {
         const dueDateTime = new Date(`${dueDate}T${dueTime}`);
         addTodo(input, dueDateTime); // Übergib den Titel und das Fälligkeitsdatum
         setInput("");
         setDueDate("");
         setDueTime("");
       }
     };
     return (
       <form onSubmit={handleSubmit}>
         <input
           type="text"
           value={input}
           onChange={(e) => setInput(e.target.value)}
           placeholder="Neues Todo..."
           required
         />
         <input
           type="date"
           value={dueDate}
           onChange={(e) => setDueDate(e.target.value)}
         />
         <input
           type="time"
           value={dueTime}
           onChange={(e) => setDueTime(e.target.value)}
         />
         <button 
           type="submit" 
           className="shimmer text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
         >
           Hinzufügen
         </button>
       </form>
     );
   };
   TodoForm.propTypes = {
     addTodo: PropTypes.func.isRequired,
   };
   export default TodoForm;