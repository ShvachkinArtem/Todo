import ToDoList from "./tasks";
import { useEffect, useState } from "react";
import { Button, Col, Row, Typography, Input, Space, Pagination } from "antd";
import "antd/dist/antd.css";
import "./index.css";

import { CaretUpOutlined , CaretDownOutlined} from "@ant-design/icons";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState([]);
  const [filterSort, setFilter] = useState([]);
  const [newTitle, setTitle] = useState("");
  const [newPage, setPage] = useState(0);
  const [filter, setnewFilter] = useState("ALL");



  const addTodo = () => {
    setTodos((prev) => [
      ...prev,
      {
        id: newId,
        status: false,
        title: newTitle,
        createdAt: new Date().getTime(),
      },
    ]);
  };

  useEffect(() => {
    setCount(todos.length);

    const sliceTodos = [...todos].slice(5 * newPage, 5 * newPage + 5);

    if (newPage > 0 && sliceTodos.length === 0) {
      setPage((prev) => prev - 1);
      return;
    }

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
  }, [filter, todos, newPage]);

  const [newId, setId] = useState(0);
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
  const handleChange = ({ target }) => {
    setTitle(target.value);
  };
  const handleButton = ({ key }) => {
    if (key === "Enter") {
      if (newTitle.trim().length === 0) {
        return;
      }
      addTodo();
      setTitle("");
      setId(newId + 1);
    }
  };
  const statusCheck = (status) => {
    setFilter([...todos].filter((todos) => todos.status === status));
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
  const sortbydate = (up) => {
    if (up) {
      setTodos(
        [...todos].sort(function (a, b) {
          return a.createdAt - b.createdAt;
        })
      );
      return;
    }
    setTodos(
      [...todos].sort(function (a, b) {
        return b.createdAt - a.createdAt;
      })
    );
  };

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
        <Row justify="center">
          <Col span={8}>
            <Input
              style={{ fontSize: "25px", fontWeight: 800, margin: 0 }}
              size="large"
              placeholder="I want to do..."
              value={newTitle}
              onChange={handleChange}
              onKeyDown={handleButton}
              className="wanttodo"
              type="text"
            />
          </Col>
        </Row>
      </div>
      <div className="options">
        <Row justify="space-around" style={{ marginTop: "50px" }}>
          <div className="buttons">
            <Row className="StatusButtons">
              <Col>
                <Button
                  size="large"
                  style={{ fontSize: "20px", fontWeight: 800 }}
                  type="default"
                  onClick={() => setnewFilter("ALL")}
                  className="filter-button"
                >
                  All
                </Button>
              </Col>
              <Col>
                <Button
                  size="large"
                  style={{ fontSize: "20px", fontWeight: 800 }}
                  type="default"
                  onClick={() => setnewFilter("DONE")}
                  className="filter-button"
                >
                  Done{" "}
                </Button>
              </Col>
              <Col>
                <Button
                  size="large"
                  style={{ fontSize: "20px", fontWeight: 800 }}
                  type="default"
                  onClick={() => setnewFilter("UNDONE")}
                  className="filter-button"
                >
                  Undone{" "}
                </Button>
              </Col>
            </Row>
          </div>
          <div className="sortbydate">
            <Row>
              <Space>
                <Typography.Title level={1} style={{ margin: 0 }}>
                  Sort by date
                </Typography.Title>

                <div className="arrows">
                  <Button type="default">
                    <div onClick={() => sortbydate(true)} className="arrowup">
                    <CaretUpOutlined style={{fontSize:'20px'}}/>
                    </div>
                  </Button>
                  <Button type="default">
                    <div
                      onClick={() => sortbydate(false)}
                      className="arrowdown"
                    >
                      <CaretDownOutlined style={{fontSize:'20px'}} />
                    </div>
                  </Button>
                </div>
              </Space>
            </Row>
          </div>
        </Row>
      </div>

      <ToDoList
        todos={filterSort}
        onToggle={toggleTodo}
        deleteTask={deleteTask}
        changeTitle={changeTitle}
        setFilter={setnewFilter}
      ></ToDoList>

      <Pagination className="Pagination"
        pageSize={5}
        total={count}
        value={newPage}
        onChange={(page) => setPage(page-1)}
      />
    </div>
  );
};

export default App;
