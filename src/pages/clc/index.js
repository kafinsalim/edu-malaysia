import React from "react";
import { Card, Input, Button } from "antd";
import { Container } from "../../uikit";
const { Search } = Input;

const Clc = () => (
  <Card>
    <Container>
      <Search
        placeholder="Cari CLC"
        onSearch={value => console.log(value)}
        style={{ width: "90%", marginRight: "10%" }}
      />
      <Button onClick={() => {}} type="primary">
        Tambah Data CLC
      </Button>
    </Container>
    <Container>
      <br />
      <br />
      <br />
      <h2>put CLC content here</h2>
      <br />
      <br />
      <br />
    </Container>
  </Card>
);

export default Clc;
