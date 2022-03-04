
import ToDoList from './tasks';
import { useState } from "react"

const App = () => {
  const [todos, setTodos] = useState([

  ])
  const [newTitle, setTitle] = useState("")
  function addTodo() {
    setTodos(prev => [...prev, { id: newId, status: false, title: newTitle, createdAt: new Date().getTime() }])
  }
  const [newId, setId] = useState(0)
  const toggleTodo = (id, newStatus) => {
    setTodos(prev => prev.map(el => {
      if (el.id === id) {
        return {
          ...el,
          status: newStatus
        }
      }
      return el
    }))
  }
  const handleChange = ({ target }) => {
    setTitle(target.value)
  }
  const handleButton = ({ key }) => {
    if (key === "Enter") {
      if (newTitle.trim().length === 0) { return };
      addTodo();
      setTitle("");
      setId(newId + 1); console.log(newId)
    }

  }
  const statusCheck = (status) => {
    setTodos(prev => [...prev].filter(todos => todos.status === status))
  }
  const changeTitle = (id, nextTitle) => {
    const index = todos.findIndex(todo => todo.id === id);
    const newTodos = [...todos];
    newTodos[index].title = nextTitle;
    setTodos(newTodos)
  }
  const deleteTask = (id) => {
    setTodos(prev => prev.filter(todos => todos.id !== id))
  }
  const sortbydate = (up) => {
    if (up) {
      setTodos([...todos].sort(function (a, b) {
        return a.createdAt - b.createdAt;
      }))
      return
    }
    setTodos([...todos].sort(function (a, b) {
      return b.createdAt - a.createdAt;
    }))
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
          <button onClick={() => statusCheck(true)} className="filter-button">Done  </button>
          <button onClick={() => statusCheck(false)} className="filter-button">Undone  </button>
        </div>
        <div className="sortbydate">
          <p style={{ marginRight: "5px" }}>Sort by date</p>
          <div className="arrows">
            <button >
              <div onClick={() => sortbydate(true)} className="arrowup">
                <svg width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.2 751.4c0 8.6 3.4 17.401 10 24.001 13.2 13.2 34.8 13.2 48 0l451.8-451.8 445.2 445.2c13.2 13.2 34.8 13.2 48 0s13.2-34.8 0-48L542 251.401c-13.2-13.2-34.8-13.2-48 0l-475.8 475.8c-6.8 6.8-10 15.4-10 24.2z" />
                </svg>

              </div>
            </button>
            <button>
              <div onClick={() => sortbydate(false)} className="arrowdown">
                <svg width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.2 751.4c0 8.6 3.4 17.401 10 24.001 13.2 13.2 34.8 13.2 48 0l451.8-451.8 445.2 445.2c13.2 13.2 34.8 13.2 48 0s13.2-34.8 0-48L542 251.401c-13.2-13.2-34.8-13.2-48 0l-475.8 475.8c-6.8 6.8-10 15.4-10 24.2z" />
                </svg>

              </div>
            </button>
          </div>
        </div>

      </div>


      <ToDoList todos={todos} onToggle={toggleTodo} deleteTask={deleteTask} changeTitle={changeTitle} statusCheck={statusCheck}></ToDoList>



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
