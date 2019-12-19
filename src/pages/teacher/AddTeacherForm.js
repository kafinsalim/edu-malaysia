import React from "react";
import useForm from "react-hook-form";
import axios from "axios";
import { base_url } from "../../utils/api";
import { Button, Form, message, Icon, Input, Row, Col } from "antd";
// import "./style.css";
const key = "updatable";

const openMessage = () => {
  message.loading({ content: "Loading...", key });
  setTimeout(() => {
    message.success({ content: "Loaded!", key, duration: 2 });
  }, 1000);
};

export default function AddTeacherForm({ closeModal }) {
  const [fetching, setFetching] = React.useState(false);
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = async data => {
    setFetching(true);
    await axios
      .post(`${base_url}/teacher`, data)
      .then(function(response) {
        setFetching(false);
        closeModal();
        message.success("Data guru berhasil disimpan !");
        console.log("then", response);
      })
      .catch(function(error) {
        setFetching(false);
        closeModal();
        message.error("Data guru gagal disimpan !");
        console.log("catch", error);
      });
    console.log("submited", data);
  }; // your form submit function which will invoke after successful validation

  console.log(watch()); // you can watch individual input by pass the name of the input

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[4, 16]}>
          <Col xs={24} sm={8}>
            <label className="ant-form-item-required">Nama Depan</label>
          </Col>
          <Col xs={24} sm={16}>
            <input className="ant-input" name="first_name" ref={register} />
          </Col>
        </Row>
        <Row gutter={[4, 16]}>
          <Col xs={24} sm={8}>
            <label className="ant-form-item-required">Nama Belakang</label>
          </Col>
          <Col xs={24} sm={16}>
            <input className="ant-input" name="last_name" ref={register} />
          </Col>
        </Row>
        <Row gutter={[4, 16]}>
          <Col xs={24} sm={8}>
            <label className="ant-form-item-required">Tempat Lahir</label>
          </Col>
          <Col xs={24} sm={16}>
            <input className="ant-input" name="place_of_birth" ref={register} />
          </Col>
        </Row>
        <Row gutter={[4, 16]}>
          <Col xs={24} sm={8}>
            <label className="ant-form-item-required">Tanggal Lahir</label>
          </Col>
          <Col xs={24} sm={16}>
            <input className="ant-input" name="date_of_birth" ref={register} />
          </Col>
        </Row>
        <Row gutter={[4, 16]}>
          <Col xs={24} sm={8}>
            <label className="ant-form-item-required">Jenis Kelamin</label>
          </Col>
          <Col xs={24} sm={16}>
            <input className="ant-input" name="gender" ref={register} />
          </Col>
        </Row>
        <Row gutter={[4, 16]}>
          <Col xs={24} sm={8}>
            <label className="ant-form-item-required">Agama</label>
          </Col>
          <Col xs={24} sm={16}>
            <input className="ant-input" name="religion" ref={register} />
          </Col>
        </Row>
        <Row gutter={[4, 16]}>
          <Col xs={24} sm={8}>
            <label className="ant-form-item-required">Asal Universitas</label>
          </Col>
          <Col xs={24} sm={16}>
            <input className="ant-input" name="university" ref={register} />
          </Col>
        </Row>
        <Row gutter={[4, 16]}>
          <Col xs={24} sm={8}>
            <label className="ant-form-item-required">Jurusan</label>
          </Col>
          <Col xs={24} sm={16}>
            <input className="ant-input" name="major" ref={register} />
          </Col>
        </Row>
        <Row gutter={[4, 16]}>
          <Col xs={24} sm={8}>
            <label className="ant-form-item-required">Tahun Angkatan</label>
          </Col>
          <Col xs={24} sm={16}>
            <input className="ant-input" name="year_of_dedication" ref={register} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <center>
              <br />
              <button type="submit" className="ant-btn ant-btn-primary">
                Simpan
              </button>
            </center>
          </Col>
        </Row>
      </form>
    </div>
  );
}
