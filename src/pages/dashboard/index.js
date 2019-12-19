import React from "react";
import { Card, Row, Col } from "antd";

const Dashboard = () => (
  <>
    <Row type="flex" justify="space-between">
      <Col span={6}>
        <Card style={{ textAlign: "center", marginRight: 16 }}>
          <h1 style={{ margin: 0, lineHeight: "2em" }}>
            <span role="img" aria-label="emoji">
              👨‍🏫
            </span>{" "}
            46
          </h1>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          style={{
            textAlign: "center",
            marginLeft: 8,
            marginRight: 8
          }}
        >
          <h1 style={{ margin: 0, lineHeight: "2em" }}>
            <span role="img" aria-label="emoji">
              🏫
            </span>{" "}
            11
          </h1>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          style={{
            textAlign: "center",
            marginLeft: 8,
            marginRight: 8
          }}
        >
          <h1 style={{ margin: 0, lineHeight: "2em" }}>
            <span role="img" aria-label="emoji">
              👨‍🎓
            </span>{" "}
            1032
          </h1>
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{ textAlign: "center", marginLeft: 16 }}>
          <h1 style={{ margin: 0, lineHeight: "2em" }}>
            <span role="img" aria-label="emoji">
              📚
            </span>{" "}
            32
          </h1>
        </Card>
      </Col>
    </Row>
    <br />
    <Card style={{ minHeight: "60%" }}>
      <h2>This is a Dashboard Page</h2>
      <p>
        welcome to dashboard page, put some of your content summary here because everyone
        logged in to this web will see this page first.
      </p>
      <p>content on development:</p>
      <ul>
        <li>CLCs page</li>
        <li>Teachers page</li>
      </ul>
      <p>
        Please kindly give some feedback for this application. Thank you{" "}
        <span role="img" aria-label="emoji">
          ❤️
        </span>
      </p>
    </Card>
  </>
);

export default Dashboard;
