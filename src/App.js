import ToDoList from "./tasks";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./pagination";
import Title from "./title";
const AMOUNT = 5;

const baseURL = "https://todo-api-learning.herokuapp.com/v1";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState([]);
  const [filterSort, setFilter] = useState([]);
  const [newPage, setPage] = useState(1);
  const [filter, setnewFilter] = useState("all");
  const [time, setbyTime] = useState("asc");

  const updateTodos = () => {
    axios
      .get(`${baseURL}/tasks/1`, {
        params: {
          order: time,
          page: newPage,
          filterBy: (filter === 'done' || filter === 'undone') ? filter : '',
          pp: 5
        },
      })
      .then((response) => {
        console.log(response);
        setTodos(response.data.tasks);
        setCount(response.data.count);
      });
  };

  useEffect(() => {
    updateTodos();
  }, []);

  useEffect(() => {
    updateTodos();
  }, [time, newPage, filter]);

  useEffect(() => {
    setFilter(todos);
  }, [filter, todos, newPage, time]);

  const toggleTodo = (uuid, newStatus) => {
/*     setTodos((prev) =>
      [...prev].map((el) => {
        if (el.uuid === uuid) {
          return {
            ...el,
            done: newStatus,
          };
        }
        return el;
      })
    ); */
    axios
    .patch(`${baseURL}/task/1/${uuid}`, {
      done: newStatus,
    })
    .then((response) => updateTodos());
  };

  const changeTitle = (uuid, nextTitle) => {
    axios
      .patch(`${baseURL}/task/1/${uuid}`, {
        name: nextTitle,
      })
      .then((response) => updateTodos());
  };
  const deleteTask = (uuid) => {
    axios.delete(`${baseURL}/task/1/${uuid}`).then((response) => updateTodos());
  };

  const sortbydate = (up) => {
    setbyTime(up);
  };

  return (
    <div>
      <h1 className="header">ToDo</h1>
      <Title updateTodos={updateTodos}></Title>
      <div className="options">
        <div className="buttons">
          <button onClick={() => setnewFilter("all")} className="filter-button">
            All
          </button>
          <button
            onClick={() => setnewFilter("done")}
            className="filter-button"
          >
            Done{" "}
          </button>
          <button
            onClick={() => setnewFilter("undone")}
            className="filter-button"
          >
            Undone{" "}
          </button>
        </div>
        <div className="sortbydate">
          <p style={{ marginRight: "5px" }}>Sort by date</p>
          <div className="arrows">
            <button>
              <div onClick={() => sortbydate("asc")} className="arrowup">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.2 751.4c0 8.6 3.4 17.401 10 24.001 13.2 13.2 34.8 13.2 48 0l451.8-451.8 445.2 445.2c13.2 13.2 34.8 13.2 48 0s13.2-34.8 0-48L542 251.401c-13.2-13.2-34.8-13.2-48 0l-475.8 475.8c-6.8 6.8-10 15.4-10 24.2z" />
                </svg>
              </div>
            </button>
            <button>
              <div onClick={() => sortbydate("desc")} className="arrowdown">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.2 751.4c0 8.6 3.4 17.401 10 24.001 13.2 13.2 34.8 13.2 48 0l451.8-451.8 445.2 445.2c13.2 13.2 34.8 13.2 48 0s13.2-34.8 0-48L542 251.401c-13.2-13.2-34.8-13.2-48 0l-475.8 475.8c-6.8 6.8-10 15.4-10 24.2z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      <ToDoList
        todos={filterSort}
        onToggle={toggleTodo}
        deleteTask={deleteTask}
        changeTitle={changeTitle}
        setFilter={setnewFilter}
      ></ToDoList>

      <Pagination count={count} setPage={setPage} />
    </div>
  );
};

export default App;
