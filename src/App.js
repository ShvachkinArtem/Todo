import './App.css';
import ToDoList from './tasks';
import { useState } from "react"

const App = () => {
  const [todos, setTodos] = useState([
    { id: -1, completed: false, title: "Do something", createdAt:new Date().toLocaleString() }
  ])
  const [newTitle, setTitle] = useState("")
  function addTodo() {
    setTodos(prev => [...prev, { id: newId, completed: false, title: newTitle ,createdAt:new Date().toLocaleString() }])
  }
  const [newId, setId] = useState(0)
  const toggleTodo = (id) => {
    console.log("to do id", id)
  }
  const handleChange = ({ target }) => {
    setTitle(target.value)
  }
  const handleButton = ({ key }) => {
    if (key === "Enter") {
      addTodo();
      setTitle("");
      setId(newId + 1); console.log(newId)
    }

  }
  const deleteTask = (id) => {
    setTodos(prev => prev.filter(todos => todos.id != id))
  }

  return (
    <div>
      <h1 className="header">
        ToDo
      </h1>
      <div className="dowhat">
        <input value={newTitle} onChange={handleChange} onKeyDown={handleButton} className="wanttodo" type="text" placeholder="I want to do..." />
      </div>
      <div className="options">
        <div className="buttons">
          <button className="filter-button">All</button>
          <button className="filter-button">Done</button>
          <button className="filter-button">Undone</button>
        </div>
        <div className="sortbydate">
          <p style={{ marginRight: "5px" }}>Sort by date</p>
          <div className="arrows">
            <button >
              <div className="arrowup">
                <svg width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.2 751.4c0 8.6 3.4 17.401 10 24.001 13.2 13.2 34.8 13.2 48 0l451.8-451.8 445.2 445.2c13.2 13.2 34.8 13.2 48 0s13.2-34.8 0-48L542 251.401c-13.2-13.2-34.8-13.2-48 0l-475.8 475.8c-6.8 6.8-10 15.4-10 24.2z" />
                </svg>

              </div>
            </button>
            <button>
              <div className="arrowdown">
                <svg width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.2 751.4c0 8.6 3.4 17.401 10 24.001 13.2 13.2 34.8 13.2 48 0l451.8-451.8 445.2 445.2c13.2 13.2 34.8 13.2 48 0s13.2-34.8 0-48L542 251.401c-13.2-13.2-34.8-13.2-48 0l-475.8 475.8c-6.8 6.8-10 15.4-10 24.2z" />
                </svg>

              </div>
            </button>
          </div>
        </div>

      </div>


      <ToDoList todos={todos} onToggle={toggleTodo} deleteTask={deleteTask}></ToDoList>

      {
    /* <div className="tasks">
        <div className="check">
            <input type="checkbox" onChange={() => console.log()} />
            <p>Do something</p>
        </div>
        <div className="delete">
            <p>1.03.2022</p>
            <button className="delete-todo">
                <svg className="trashcan" width="32px" height="32px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg" >
                    <defs>
                        
                    </defs>
                    <title>trash-can</title>
                    <rect x="12" y="12" width="2" height="12" />
                    <rect x="18" y="12" width="2" height="12" />
                    <path d="M4,6V8H6V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V8h2V6ZM8,28V8H24V28Z" />
                    <rect x="12" y="2" width="8" height="2" />
                    <rect style={{fill:'none'}} id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1"
                        width="32" height="32" />
                </svg>
            </button>
        </div>
    </div> */}
      <div className="pagination-wrapper">
        <button className="pagination-button">{"<<"}</button>
        <button className="pagination-button">1</button>
        <button className="pagination-button">2</button>
        <button className="pagination-button">3</button>
        <button className="pagination-button">4</button>
        <button className="pagination-button">5</button>
        <button className="pagination-button">{">>"}</button>
      </div>
    </div>
  );
}

export default App;
