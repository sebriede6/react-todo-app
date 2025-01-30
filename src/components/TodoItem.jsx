import PropTypes from 'prop-types';

const TodoItem = ({ todo, toggleComplete, removeTodo }) => {
    return (
        <li className="flex items-center justify-between py-2 border-t border-gray-300">
            <input 
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleComplete(todo.id)}
            className="cursor-pointer"
            />
            <span className={`mx-4 ${todo.done ? 'line-through' : ''}`}>{todo.text}</span>
            <div className="flex space-x-2">
                <button
                onClick={() => removeTodo(todo.id)}
                className="bg-red-500 px-4 py-2 text-orange-100"
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
        text: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired
    }).isRequired,
    toggleComplete: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired
};

export default TodoItem;