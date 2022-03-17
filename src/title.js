import { Row, Col, Input } from "antd";
import { useState } from "react";
const TitleSet = ({ setTodos }) => {
  const [newTitle, setTitle] = useState("");
  const [newId, setId] = useState(0);

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

  return (
    <Row justify="center">
      <Col span={9}>
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
  );
};
export default TitleSet;
