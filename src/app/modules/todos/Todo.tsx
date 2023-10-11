import { toggleTodo } from "../../core/store/todos/todos.actions";
import { memo } from "react";
import { useAppDispatch } from "../../core/store/store";

const Todo = ({ todo}: any) => {
  const dispatch = useAppDispatch();

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

export default memo(Todo);
