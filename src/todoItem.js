import { useState } from "react";
import { Row, Col, Card , Space } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";

const TodoItem = ({ onChange, todo, deleteTask, setTodos }) => {
  const [editTask, setTask] = useState(todo.title);
  const [editStatus, setStatus] = useState(false);
  const handleTask = ({ key }) => {
    if (key === "Enter") {
      if (editTask.trim().length === 0) {
        return;
      }
      setTodos(todo.id, editTask);
      setStatus(false);
    }
  };
  const taskelement = editStatus ? (
    <input
      maxLength={33}
      className={editTask.length === 0 ? "trumbleA" : ""}
      value={editTask}
      onChange={(e) => setTask(e.target.value)}
      onKeyDown={handleTask}
    ></input>
  ) : (
    <p onClick={() => setStatus(true)}>{todo.title} </p>
  );

  return (
    <div className="todoTasks">
      <Card>
        <Row justify="space-around">
          <Col span={8}>
            <Row className="LeftPart" justify="space-between">
              <Space style={{alignItems:'baseline'}}>
              <Col>
                {" "}
                <Checkbox
                  value={todo.status}
                  onChange={({ target }) => onChange(todo.id, target.checked)}
                  checked={todo.status}
                />
              </Col>
              <Col>{taskelement}</Col>
              </Space>
            </Row>
          </Col>
          <Col span={8}>
            <Row className="RightPart" justify="space-between">
              <p>{new Date(todo.createdAt).toLocaleString()}</p>
              <button
                className="delete-todo"
                onClick={() => deleteTask(todo.id)}
              >
                <svg
                  className="trashcan"
                  width="32px"
                  height="32px"
                  viewBox="0 0 32 32"
                  id="icon"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs></defs>
                  <title>trash-can</title>
                  <rect x="12" y="12" width="2" height="12" />
                  <rect x="18" y="12" width="2" height="12" />
                  <path d="M4,6V8H6V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V8h2V6ZM8,28V8H24V28Z" />
                  <rect x="12" y="2" width="8" height="2" />
                  <rect
                    style={{ fill: "none" }}
                    id="_Transparent_Rectangle_"
                    data-name="&lt;Transparent Rectangle&gt;"
                    className="cls-1"
                    width="32"
                    height="32"
                  />
                </svg>
              </button>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default TodoItem;
