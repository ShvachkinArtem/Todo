
import ToDoList from './tasks';
import { useEffect, useState } from "react"
import axios from 'axios';
const baseURL = "https://todo-api-learning.herokuapp.com/v1"
const App = () => {
  const [todos, setTodos] = useState([])
  const [count, setCount] = useState([])
  const [filterSort, setFilter] = useState([])
  const [newTitle, setTitle] = useState("")
  const [newPage, setPage] = useState(0)
  const [filter, setnewFilter] = useState('ALL');
const [time,setbyTime] = useState('asc')
  const addTodo = () => {
    setTodos(prev => [...prev, { uuid: newId, done: false, name: newTitle, createdAt: new Date().getTime() }])
  }

  const updateTodos = () => {
    axios.get(`${baseURL}/tasks/1`,{params:{
      order:time
    }}).then((response) => {
      console.log(response)
      setTodos(response.data.tasks)
    })
  }

  useEffect(() => {
    updateTodos();
  }, []);

  useEffect(() => {
    updateTodos();
  }, [time]);

  useEffect(() => {
    setCount(todos.length);

    const sliceTodos = ([...todos].slice(5 * newPage, 5 * newPage + 5))

    if (newPage > 0 && sliceTodos.length === 0) {
      setPage(prev => prev - 1)
      return
    }

    if (filter === 'ALL') {
      setFilter([...sliceTodos]);
      return;
    }

    if (filter === 'DONE') {
      setFilter([...sliceTodos].filter(todos => todos.done === true))
      return;
    }


    if (filter === 'UNDONE') {
      setFilter([...sliceTodos].filter(todos => todos.done === false))
      return;
    }

  }, [filter, todos, newPage , time]) 
  // const deleteTodo = (uuid) => {
  //   axios.delete(`${baseURL}/task/1/${uuid}`).then((response) => updateTodos())
  // };
  const [newId, setId] = useState(0)
  const toggleTodo = (uuid, newStatus) => {
    setTodos(prev => prev.map(el => {
      if (el.uuid === uuid) {
        return {
          ...el,
          done: newStatus
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

      axios.post(`${baseURL}/task/1`, {done: false, name: newTitle}).then((response) => {
        

        
        updateTodos()
      })        .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert(error.response.data.message)
        }
      });

      
      setTitle("");
      setId(newId + 1); console.log(newId)
    }

  }
  // const statusCheck = (done) => {
  //   setFilter([...todos].filter(todos => todos.done === done))
  // }
  const changeTitle = (uuid, nextTitle) => {
    const index = todos.findIndex(todo => todo.uuid === uuid);
    const newTodos = [...todos];
    newTodos[index].name = nextTitle;
    setTodos(newTodos)
  }
  const deleteTask = (uuid) => {
    axios.delete(`${baseURL}/task/1/${uuid}`).then((response) => updateTodos())
    setTodos(prev => prev.filter(todos => todos.uuid !== uuid))
  }
  const sortbydate = (up) => {
setbyTime(up)
  }

  const countPages = Math.ceil(count / 5);

  const paginationButtons = []
  for (let i = 0; i < countPages; i++) {
    paginationButtons.push(<button onClick={() => setPage(i)} className="pagination-button">{i + 1}</button>)
  }

  const pagination = count > 5 ? (<div className="pagination-wrapper">
    <button className="pagination-button" onClick={() => setPage(0)}> {"<<"}</button>
    {paginationButtons}
    <button className="pagination-button" onClick={() => setPage(countPages - 1)}>{">>"}</button>
  </div>) : <></>

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
          <button onClick={() => setnewFilter('ALL')} className="filter-button" >All</button>
          <button onClick={() => setnewFilter('DONE')} className="filter-button">Done  </button>
          <button onClick={() => setnewFilter('UNDONE')} className="filter-button">Undone  </button>
        </div>
        <div className="sortbydate">
          <p style={{ marginRight: "5px" }}>Sort by date</p>
          <div className="arrows">
            <button >
              <div onClick={() => sortbydate('asc')} className="arrowup">
                <svg width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.2 751.4c0 8.6 3.4 17.401 10 24.001 13.2 13.2 34.8 13.2 48 0l451.8-451.8 445.2 445.2c13.2 13.2 34.8 13.2 48 0s13.2-34.8 0-48L542 251.401c-13.2-13.2-34.8-13.2-48 0l-475.8 475.8c-6.8 6.8-10 15.4-10 24.2z" />
                </svg>

              </div>
            </button>
            <button>
              <div onClick={() => sortbydate('desc')} className="arrowdown">
                <svg width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.2 751.4c0 8.6 3.4 17.401 10 24.001 13.2 13.2 34.8 13.2 48 0l451.8-451.8 445.2 445.2c13.2 13.2 34.8 13.2 48 0s13.2-34.8 0-48L542 251.401c-13.2-13.2-34.8-13.2-48 0l-475.8 475.8c-6.8 6.8-10 15.4-10 24.2z" />
                </svg>

              </div>
            </button>
          </div>
        </div>

      </div>


      <ToDoList todos={filterSort} onToggle={toggleTodo} deleteTask={deleteTask} changeTitle={changeTitle} setFilter={setnewFilter}></ToDoList>



      {pagination}

    </div>
  );
}

export default App;
