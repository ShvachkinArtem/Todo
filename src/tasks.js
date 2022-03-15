import TodoItem from "./todoItem";
const ToDoList = ({ todos, onToggle, deleteTask, changeTitle }) => (
  <div className="tasks">
    {todos.map((todo, index) => (
      <TodoItem
        key={index}
        todo={todo}
        index={index}
        onChange={onToggle}
        deleteTask={deleteTask}
        setTodos={changeTitle}
      ></TodoItem>
    ))}
  </div>
);

export default ToDoList;
