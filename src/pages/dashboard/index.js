import React from "react";
import { Card, Row, Col } from "antd";
import styled from "styled-components";

const StyledCard = styled(Card)`
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
`;

const SummaryContent = styled.h3`
  margin: 0;
  line-height: 1.5em;
`;

const Dashboard = () => (
  <>
    <Row gutter={[16, 16]}>
      <Col xs={12} md={6}>
        <StyledCard>
          <SummaryContent>
            <span role="img" aria-label="emoji">
              👨‍🏫
            </span>{" "}
            46
          </SummaryContent>
        </StyledCard>
      </Col>
      <Col xs={12} md={6}>
        <StyledCard>
          <SummaryContent>
            <span role="img" aria-label="emoji">
              🏫
            </span>{" "}
            11
          </SummaryContent>
        </StyledCard>
      </Col>
      <Col xs={12} md={6}>
        <StyledCard>
          <SummaryContent>
            <span role="img" aria-label="emoji">
              👨‍🎓
            </span>{" "}
            1032
          </SummaryContent>
        </StyledCard>
      </Col>
      <Col xs={12} md={6}>
        <StyledCard>
          <SummaryContent>
            <span role="img" aria-label="emoji">
              📚
            </span>{" "}
            32
          </SummaryContent>
        </StyledCard>
      </Col>
    </Row>
    <br />
    <Card style={{ minHeight: "60%" }}>
      <h2>This is a Dashboard Page</h2>
      <p>
        welcome to dashboard page, put some of your content summary here because
        everyone logged in to this web will see this page first.
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
