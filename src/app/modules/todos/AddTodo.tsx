import { memo, useState } from "react";
import { addTodo } from "../../core/store/todos/todos.actions";
import { useAppDispatch } from "../../core/store/store";

const AddTodo = () => {
    const dispatch = useAppDispatch()
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