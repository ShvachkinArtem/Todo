import TodoItem from "./todoItem";
const ToDoList = ({ todos, onToggle, deleteTask, changeTitle }) => {
  console.log(todos[0]);

  return (
    <div className="tasks">
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          onChange={onToggle}
          deleteTask={deleteTask}
          setTodos={changeTitle}
        ></TodoItem>
      ))}
    </div>
  );
};

export default ToDoList;
