
import { Button, Col, Row, Typography, Space,  } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

const SortButtons = ({setTodos , setFilter ,todos}) => {

    
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
    <div className="options">
        <Row justify="space-around" style={{ marginTop: "50px" }}>
          <div className="buttons">
            <Row className="StatusButtons">
              <Col>
                <Button
                  size="large"
                  style={{ fontSize: "20px", fontWeight: 800 }}
                  type="default"
                  onClick={() => setFilter("ALL")}
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
                  onClick={() => setFilter("DONE")}
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
                  onClick={() => setFilter("UNDONE")}
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
                      <CaretUpOutlined style={{ fontSize: "20px" }} />
                    </div>
                  </Button>
                  <Button type="default">
                    <div
                      onClick={() => sortbydate(false)}
                      className="arrowdown"
                    >
                      <CaretDownOutlined style={{ fontSize: "20px" }} />
                    </div>
                  </Button>
                </div>
              </Space>
            </Row>
          </div>
        </Row>
      </div>
)} 
export default SortButtons