import { useState } from "react";
import { connect } from "react-redux";
//
import { addTodo } from "../../redux/actions/todo.actions";

const AddTodo = ({ addTodo }: any) => {
    const [input, setInput] = useState("");

    const updateInput = (input: string) => {
        setInput(input);
      };
    
    const handleAddTodo = () => {
        addTodo(input);
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
export default connect(
  null,
  { addTodo }
)(AddTodo);