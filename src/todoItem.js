export default function TodoItem(props) {
    return (
        <div className="todoTasks">
            <div className="check">
                <input type="checkbox" onChange={() => props.onChange(props.todos.id)} />
                <p>{props.todos.title}</p>
            </div>
            <div className="delete">
                <p>1.03.2022</p>
                <button className="delete-todo" onClick={()=>props.deleteTask(props.todos.id)}>
                    <svg className="trashcan" width="32px" height="32px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg" >
                        <defs>
                        </defs>
                        <title>trash-can</title>
                        <rect x="12" y="12" width="2" height="12" />
                        <rect x="18" y="12" width="2" height="12" />
                        <path d="M4,6V8H6V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V8h2V6ZM8,28V8H24V28Z" />
                        <rect x="12" y="2" width="8" height="2" />
                        <rect style={{ fill: 'none' }} id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" className="cls-1"
                            width="32" height="32" />
                    </svg>
                </button>
            </div>
        </div>
    )
}