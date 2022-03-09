import TodoItem from "./todoItem"
const ToDoList = ({ todos, onToggle, deleteTask, changeTitle }) =>
(
    <div className="tasks">
        {

            todos.map((todos, index) => <TodoItem key={index} todos={todos} index={index} onChange={onToggle} deleteTask={deleteTask} setTodos={changeTitle}></TodoItem>)
        }
    </div>

)

export default ToDoList