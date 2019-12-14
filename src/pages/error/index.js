import React from "react";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";
import { Container } from "../../uikit";

const Error404 = () => (
  <Card
    style={{
      minHeight: "60%",
      paddingTop: "25%",
      paddingBottom: "25%"
    }}
  >
    <Container>
      <center>
        <h2>Halaman yang anda cari tidak tersedia</h2>
        <Link to="/">
          <Button type="primary">menuju halaman utama</Button>
        </Link>
      </center>
    </Container>
  </Card>
);

export default Error404;
