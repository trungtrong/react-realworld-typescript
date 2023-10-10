import { useDispatch } from "react-redux";
import { toggleTodo } from "../../redux/todos/todos.actions";

const Todo = ({ todo}: any) => {
  const dispatch = useDispatch();

  return (
    <li className="todo-item" onClick={() => dispatch(toggleTodo(todo.id))}>
      {todo && todo.completed ? "👌" : "👋"}{" "}
      <span
        className={ "todo-item__text " + todo && todo.completed ? "todo-item__text--completed" : '' }
      >
        {todo.content}
      </span>
    </li>
  )
};

export default Todo;
