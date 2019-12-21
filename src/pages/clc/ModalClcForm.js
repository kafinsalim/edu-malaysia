import React from "react";
import useForm from "react-hook-form";
import axios from "axios";
import styled from "styled-components";
import { base_url, fetchAPI } from "../../utils/serviceAPI";
import { Modal, Select, DatePicker, message, Row, Col, Spin } from "antd";
// import moment from "moment";
import "moment/locale/id";

const Warning = styled.p`
  color: #bf1650;
  margin: 0.5em auto 0px 4px;
  &::before {
    display: inline;
    content: "⚠ ";
  }
`;

export default function ModalClcForm(props) {
  const {
    visible,
    handleCloseModal,
    handleSubmitForm,
    type,
    editClcId
  } = props;
  const [fetching, setFetching] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const { register, handleSubmit, watch, errors, setValue } = useForm();

  // const data containing render content
  const ModalTitle = type === "edit" ? "Edit data CLC" : "Tambahkan data CLC";

  React.useEffect(() => {
    console.log(`effect editClcId:${editClcId}`);
    function getClc(id) {
      setFetching(true);
      fetchAPI(`clc/${id}`)
        .then(response => {
          setFormData(response.data);
          setFetching(false);
        })
        .catch(e => {
          setFetching(false);
          handleCloseModal();
          message.warning("terdapat masalah jaringan");
          console.error(e);
        });
    }
    if (editClcId) {
      getClc(editClcId);
    } else {
      setFormData({});
    }
  }, [editClcId]);

  const onSubmit = async data => {
    // form submit function which will invoke after successful validation
    setFetching(true);
    if (type === "add") {
      await axios
        .post(`${base_url}/clc`, data)
        .then(function(response) {
          setFetching(false);
          handleSubmitForm();
          message.success("Berhasil menyimpan data !");
          console.log("then", response);
        })
        .catch(function(error) {
          setFetching(false);
          message.warning("terdapat masalah jaringan");
          console.log("catch", error);
        });
      console.log("submited add ", data);
    } else {
      // get id from state
      const { id } = formData;
      await axios
        .put(`${base_url}/clc/${id}`, data)
        .then(function(response) {
          setFetching(false);
          handleSubmitForm();
          message.success("Berhasil melakukan edit data!");
          console.log("then", response);
        })
        .catch(function(error) {
          setFetching(false);
          message.warning("terdapat masalah jaringan");
          console.log("catch", error);
        });
      console.warn("submited edit ", data);
    }
  };

  // you can watch individual input by pass the name of the input
  console.log(watch(), errors);
  // const default_date_of_birth = moment("2001-01-01T00:00:00Z")
  //   .locale("id")
  //   .format("LL");
  const {
    name = "",
    clc_level = "",
    place_of_birth = "",
    date_of_birth = "2001-01-01",
    gender = "L",
    religion = "-",
    university = "",
    major = "",
    year_of_dedication = ""
  } = formData;

  return (
    <Modal
      title={ModalTitle}
      style={{ top: 32 }}
      visible={visible}
      onCancel={handleCloseModal}
      onCreate={() => console.log("onCreate")}
      footer={null}
    >
      <Spin tip="Sedang Memuat..." spinning={fetching}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[4, 16]}>
            <Col xs={24} sm={8}>
              <label className="ant-form-item-required  has-feedback has-warning">
                Nama CLC
              </label>
            </Col>
            <Col xs={24} sm={16}>
              <input
                className="ant-input"
                name="name"
                defaultValue={name}
                ref={register({ required: true })}
              />
              {!!errors.name && <Warning>Mohon mengisi nama depan</Warning>}
            </Col>
          </Row>
          <Row gutter={[4, 16]}>
            <Col xs={24} sm={8}>
              <label className="ant-form-item-required">Level</label>
            </Col>
            <Col xs={24} sm={16}>
              <Select
                defaultValue={clc_level}
                onChange={e => {
                  setValue("clc_level", e);
                }}
              >
                <Select.Option value="SD">SD</Select.Option>
                <Select.Option value="SMP">SMP</Select.Option>
              </Select>
              <input
                type="hidden"
                name="gender"
                defaultValue={gender}
                ref={register}
              />
            </Col>
          </Row>
          <Row gutter={[4, 16]}>
            <Col xs={24} sm={8}>
              <label className="ant-form-item-required">Status</label>
            </Col>
            <Col xs={24} sm={16}>
              <input
                className="ant-input"
                name="place_of_birth"
                defaultValue={place_of_birth}
                ref={register({ required: true })}
              />
              {!!errors.place_of_birth && (
                <Warning>Mohon mengisi tempat lahir</Warning>
              )}
            </Col>
          </Row>
          <Row gutter={[4, 16]}>
            <Col xs={24} sm={8}>
              <label className="ant-form-item-required"></label>
            </Col>
            <Col xs={24} sm={16}>
              <DatePicker
                onChange={e => {
                  setValue("date_of_birth", e.locale("id").format("LL"));
                }}
                style={{ width: "100%" }}
              />
              <input
                type="hidden"
                name="date_of_birth"
                defaultValue={date_of_birth}
                ref={register}
              />
            </Col>
          </Row>
          <Row gutter={[4, 16]}>
            <Col xs={24} sm={8}>
              <label className="ant-form-item-required">Gugus</label>
            </Col>
            <Col xs={24} sm={16}>
              <Select
                defaultValue={gender}
                onChange={e => {
                  setValue("gender", e);
                }}
              >
                <Select.Option value="L">Laki-laki</Select.Option>
                <Select.Option value="P">Perempuan</Select.Option>
              </Select>
              <input
                type="hidden"
                name="gender"
                defaultValue={gender}
                ref={register}
              />
            </Col>
          </Row>
          <Row gutter={[4, 16]}>
            <Col xs={24} sm={8}>
              <label className="ant-form-item-required">Koordinate</label>
            </Col>
            <Col xs={24} sm={16}>
              <input
                className="ant-input"
                name="religion"
                defaultValue={religion}
                ref={register}
              />
            </Col>
          </Row>
          <Row gutter={[4, 16]}>
            <Col xs={24} sm={8}>
              <label className="ant-form-item-required">Note</label>
            </Col>
            <Col xs={24} sm={16}>
              <input
                className="ant-input"
                name="university"
                defaultValue={university}
                ref={register({ required: true })}
              />
              {!!errors.university && (
                <Warning>Mohon mengisi asal universitas</Warning>
              )}
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
      </Spin>
    </Modal>
  );
}
