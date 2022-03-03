import TodoItem from "./todoItem"
export default function ToDoList(props) {
    return (
        <div className="tasks">
            {

                props.todos.map((todos, index) => <TodoItem key={index} todos={todos} index={index} onChange={props.onToggle} deleteTask={props.deleteTask}></TodoItem>)
            }
        </div>

    )
}