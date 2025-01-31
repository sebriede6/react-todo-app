import { useState } from "react";
import PropTypes from "prop-types";
import "./TodoForm.css";

const TodoForm = ({ addTodo }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTodo(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Neues Todo..."
      />
      <button
        type="submit"
        className="shimmer text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
      >
        Hinzufügen, musste ja, ansonsten speichert er ja nichts ;D
      </button>
    </form>
  );
};
TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default TodoForm;
