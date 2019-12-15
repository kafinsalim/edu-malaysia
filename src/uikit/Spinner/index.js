import React from "react";
import { Spin } from "antd";
import styled from "styled-components";

const Center = styled.div`
  display: flex;
  justify-content: center;
  margin: 33% auto;
`;

export default () => (
  <Center>
    <Spin />
  </Center>
);
