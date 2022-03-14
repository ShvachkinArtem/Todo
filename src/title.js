import { useEffect, useState } from "react";
import axios from "axios";
const baseURL = "https://todo-api-learning.herokuapp.com/v1";
export default function ({ updateTodos }) {
  const [newTitle, setTitle] = useState("");

  const handleChange = ({ target }) => {
    setTitle(target.value);
  };
  const handleButton = ({ key }) => {
    if (key === "Enter") {
      if (newTitle.trim().length === 0) {
        return;
      }

      axios
        .post(`${baseURL}/task/1`, { done: false, name: newTitle })
        .then((response) => {
          updateTodos();
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            alert(error.response.data.message);
          }
        });

      setTitle("");
    }
  };
  return (
    <div className="dowhat">
      <input
        value={newTitle}
        onChange={handleChange}
        onKeyDown={handleButton}
        className="wanttodo"
        type="text"
        placeholder="I want to do..."
      />
    </div>
  );
}
