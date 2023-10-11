import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../app/core/store/todos/todos.actions";

const AddTodo = () => {
    const dispatch = useDispatch()
    const [input, setInput] = useState("");

    const updateInput = (input: string) => {
        setInput(input);
      };
    
    const handleAddTodo = () => {
       dispatch(addTodo(input));
       setInput("");
    };

    return (
        <div>
          <input
            onChange={e => updateInput(e.target.value)}
            value={input}
          />
          <button className="add-todo" onClick={handleAddTodo}>
            Add Todo
          </button>
        </div>
    );

}

export default memo(AddTodo);