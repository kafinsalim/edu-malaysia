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
      <h2>Selamat Datang di Halaman Dashboard</h2>
      <p>
        Halaman ini bermanfaat untuk menyimpan informasi yang perlu perhatian
        khusus ataupun informasi yang rangkuman dari keseluruhan data. Halaman
        ini adalah halaman awal yang akan diakses semua pengguna.
      </p>
      <p>Halaman ini masih dalam pengembangan</p>
    </Card>
  </>
);

export default Dashboard;
