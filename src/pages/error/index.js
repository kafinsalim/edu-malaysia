import React from "react";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";

const Error404 = () => (
  <Card>
    <center>
      <br />
      <br />
      <h1>ERROR 404</h1>
      <h3>Halaman yang anda cari tidak tersedia</h3>
      <br />
      <Link to="/">
        <Button type="primary">menuju halaman utama</Button>
      </Link>
      <br />
      <br />
      <br />
      <br />
      <br />
    </center>
  </Card>
);

export default Error404;
