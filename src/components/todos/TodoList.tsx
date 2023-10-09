import { connect } from "react-redux";
//
import Todo from "./Todo";
import { getTodosByVisibilityFilter } from "../../redux/selector";
// import { getTodos } from "../redux/selectors";

const TodoList = ({ todos }: any) => (
  <ul className="todo-list">
    {todos && todos.length
      ? todos.map((todo: any, index: number) => {
          return <Todo key={`todo-${todo.id}`} todo={todo} />;
        })
      : "No todos, yay!"}
  </ul>
);

// Store is updated, even though any fields
const mapStateToProps = (state: any) => {
  return { todos: getTodosByVisibilityFilter(state) };
};
// export default TodoList;
export default connect(mapStateToProps)(TodoList);
