import { useState } from "react";
import { addTodo } from "../../redux/reducers/todos.reducer";
import { useDispatch } from "react-redux";

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

export default AddTodo;