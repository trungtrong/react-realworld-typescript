import { useSelector } from "react-redux";
//
import Todo from "./Todo";
import { getTodosByVisibilityFilter } from "../../app/core/store/selector";
import { memo } from "react";

const TodoList = () => {
  const todos = useSelector(state =>
    getTodosByVisibilityFilter(state)
  )

  return (
    <ul className="todo-list">
      {todos && todos.length
        ? todos.map((todo: any, index: number) => {
            return <Todo key={`todo-${todo.id}`} todo={todo} />;
          })
        : "No todos, yay!"}
    </ul>
  );
}

export default memo(TodoList);