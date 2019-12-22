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
    status = "",
    ladang = "",
    gugus = "2001-01-01",
    lat = "",
    long = "",
    note = ""
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
              {!!errors.name && <Warning>Mohon mengisi nama CLC</Warning>}
            </Col>
          </Row>
          <Row gutter={[4, 16]}>
            <Col xs={24} sm={8}>
              <label className="ant-form-item-required">Level</label>
            </Col>
            <Col xs={24} sm={16}>
              <Select
                onChange={e => {
                  setValue("clc_level", e);
                }}
                defaultActiveFirstOption={clc_level}
                value={clc_level}
              >
                <Select.Option value="clc_sd">SD</Select.Option>
                <Select.Option value="clc_smp">SMP</Select.Option>
              </Select>
              <input
                type="hidden"
                name="clc_level"
                defaultValue={clc_level}
                ref={register}
              />
            </Col>
          </Row>
          <Row gutter={[4, 16]}>
            <Col xs={24} sm={8}>
              <label className="ant-form-item-required">Kelas</label>
            </Col>
            <Col xs={4} sm={2}>
              <input className="ant-input" name="kelas_1" ref={register} />
            </Col>
            <Col xs={4} sm={2}>
              <input className="ant-input" name="kelas_2" ref={register} />
            </Col>
            <Col xs={4} sm={2}>
              <input className="ant-input" name="kelas_3" ref={register} />
            </Col>
            <Col xs={4} sm={2}>
              <input className="ant-input" name="kelas_4" ref={register} />
            </Col>
            <Col xs={4} sm={2}>
              <input className="ant-input" name="kelas_5" ref={register} />
            </Col>
            <Col xs={4} sm={2}>
              <input className="ant-input" name="kelas_6" ref={register} />
            </Col>
          </Row>
          <Row gutter={[4, 16]}>
            <Col xs={24} sm={8}>
              <label className="ant-form-item-required">Status</label>
            </Col>
            <Col xs={24} sm={16}>
              <Select
                onChange={e => {
                  setValue("ladang", e);
                }}
                defaultActiveFirstOption={ladang}
                value={ladang}
              >
                <Select.Option value="ladang">Ladang</Select.Option>
                <Select.Option value="non_ladang">Non Ladang</Select.Option>
              </Select>
              <input
                type="hidden"
                name="ladang"
                defaultValue={ladang}
                ref={register}
              />
            </Col>
          </Row>
          <Row gutter={[4, 16]}>
            <Col xs={24} sm={8}>
              <label className="ant-form-item-required">Gugus</label>
            </Col>
            <Col xs={24} sm={16}>
              <input
                className="ant-input"
                name="name"
                defaultValue={name}
                ref={register({ required: true })}
              />
              {!!errors.name && <Warning>Mohon mengisi gugus</Warning>}
            </Col>
          </Row>
          <Row gutter={[4, 16]}>
            <Col xs={24} sm={8}>
              <label className="ant-form-item-required">Koordinat</label>
            </Col>
            <Col xs={12} sm={8}>
              <input
                className="ant-input"
                name="lat"
                defaultValue={lat}
                ref={register}
              />
            </Col>
            <Col xs={12} sm={8}>
              <input
                className="ant-input"
                name="long"
                defaultValue={long}
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
                name="note"
                defaultValue={note}
                ref={register({ required: true })}
              />
              {!!errors.note && (
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
