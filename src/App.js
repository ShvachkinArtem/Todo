import ToDoList from "./tasks";
import { useEffect, useState } from "react";
import { Col, Row, Typography, Pagination } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import TitleSet from "./title";
import SortButtons from "./sortbuttons";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState([]);
  const [filterSort, setFilter] = useState([]);
  const [filter, setnewFilter] = useState("ALL");
  const [newPage, setPage] = useState(0);
  console.log(newPage,count);
  useEffect(() => {
    setCount(todos.length);

    const sliceTodos = [...todos].slice(5 * newPage, 5 * newPage + 5);
    if (filter === "ALL") {
      setFilter([...sliceTodos]);
      return;
    }

    if (filter === "DONE") {
      setFilter([...sliceTodos].filter((todos) => todos.status === true));
      return;
    }

    if (filter === "UNDONE") {
      setFilter([...sliceTodos].filter((todos) => todos.status === false));
      return;
    }
    if (newPage > 0 && sliceTodos.length === 0) {
      setPage((prev) => prev - 1);
      return;
    }
  }, [filter, todos, newPage]);

  const toggleTodo = (id, newStatus) => {
    setTodos((prev) =>
      prev.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            status: newStatus,
          };
        }
        return el;
      })
    );
  };

  const changeTitle = (id, nextTitle) => {
    const index = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos[index].title = nextTitle;
    setTodos(newTodos);
  };
  const deleteTask = (id) => {
    setTodos((prev) => prev.filter((todos) => todos.id !== id));
  };

  const pag =
    count > 5 ? (
      <Pagination
        className="Pagination"
        pageSize={5}
        total={count}
        value={newPage}
        onChange={(page) => setPage(page - 1)}
      />
    ) : (
      <></>
    );

  return (
    <div className="App">
      <Row justify="center">
        <Col span={3}>
          {" "}
          <Typography.Title
            level={1}
            style={{ fontSize: "60px", fontWeight: 600, margin: 0 }}
          >
            ToDo
          </Typography.Title>
        </Col>
      </Row>
      <div className="dowhat">
        <TitleSet setTodos={setTodos}></TitleSet>
      </div>
      <div>
        <SortButtons
          todos={todos}
          setTodos={setTodos}
          setFilter={setnewFilter}
        ></SortButtons>
      </div>
      <ToDoList
        todos={filterSort}
        onToggle={toggleTodo}
        deleteTask={deleteTask}
        changeTitle={changeTitle}
      ></ToDoList>

      <Row justify="center">{pag}</Row>
    </div>
  );
};

export default App;
