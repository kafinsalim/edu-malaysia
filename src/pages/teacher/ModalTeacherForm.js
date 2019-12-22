import React from "react";
import useForm from "react-hook-form";
import axios from "axios";
import styled from "styled-components";
import { base_url, fetchAPI } from "../../utils/serviceAPI";
import {
  Modal,
  Select,
  DatePicker,
  message,
  Icon,
  Input,
  Row,
  Col,
  Spin
} from "antd";
import moment from "moment";
import "moment/locale/id";

const Warning = styled.p`
  color: #bf1650;
  margin: 0.5em auto 0px 4px;
  &::before {
    display: inline;
    content: "⚠ ";
  }
`;

export default function ModalTeacherForm(props) {
  const {
    visible,
    handleCloseModal,
    handleSubmitForm,
    editTeacherById
  } = props;
  const [fetching, setFetching] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const { register, handleSubmit, watch, errors, setValue } = useForm();
  console.log("ModalTeacherForm", props, formData);
  // const data containing render content
  const ModalTitle = !!editTeacherById
    ? "Edit data Guru"
    : "Tambahkan data Guru";

  React.useEffect(() => {
    console.log(`effect editTeacherById:${editTeacherById}`);
    function getTeacher(id) {
      console.log(`getting Teacher by id ${id}`);
      setFetching(true);
      fetchAPI(`teacher/${id}`)
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
    if (!!editTeacherById) {
      getTeacher(editTeacherById);
    } else {
      setFormData({});
    }
  }, [editTeacherById]);

  const onSubmit = async data => {
    // form submit function which will invoke after successful validation
    setFetching(true);
    if (!editTeacherById) {
      await axios
        .post(`${base_url}/teacher`, data)
        .then(function(response) {
          setFetching(false);
          handleSubmitForm();
          handleCloseModal();
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
      console.log(`editing with id ${id}`);
      if (!id) {
        message.warning("terdapat masalah jaringan");
        console.log(`problem but editTeacherById is ${editTeacherById}`);
      }
      await axios
        .put(`${base_url}/teacher/${id}`, data)
        .then(function(response) {
          setFetching(false);
          handleSubmitForm();
          handleCloseModal();
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
    // clear form after submit
    document.getElementById("teacher").reset();
  };

  // you can watch individual input by pass the name of the input
  // console.log(watch(), errors);
  const {
    first_name = "",
    last_name = "",
    place_of_birth = "",
    date_of_birth = "",
    gender = "L",
    religion = "",
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
        <form onSubmit={handleSubmit(onSubmit)} id="teacher">
          <Row gutter={[4, 16]}>
            <Col xs={24} sm={8}>
              <label className="ant-form-item-required  has-feedback has-warning">
                Nama Depan
              </label>
            </Col>
            <Col xs={24} sm={16}>
              <input
                className="ant-input"
                name="first_name"
                defaultValue={first_name}
                ref={register({ required: true })}
              />
              {!!errors.first_name && (
                <Warning>Mohon mengisi nama depan</Warning>
              )}
            </Col>
          </Row>
          <Row gutter={[4, 16]}>
            <Col xs={24} sm={8}>
              <label className="ant-form-item">Nama Belakang</label>
            </Col>
            <Col xs={24} sm={16}>
              <input
                className="ant-input"
                name="last_name"
                defaultValue={last_name}
                ref={register}
              />
            </Col>
          </Row>
          <Row gutter={[4, 16]}>
            <Col xs={24} sm={8}>
              <label className="ant-form-item-required">Tempat Lahir</label>
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
              <label className="ant-form-item-required">Tanggal Lahir</label>
            </Col>
            <Col xs={24} sm={16}>
              <DatePicker
                onChange={e => {
                  setValue("date_of_birth", e.format("YYYY-MM-DD"));
                }}
                defaultValue={moment(date_of_birth, "YYYY-MM-DD")}
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
              <label className="ant-form-item-required">Jenis Kelamin</label>
            </Col>
            <Col xs={24} sm={16}>
              <Select
                onChange={e => {
                  setValue("gender", e);
                }}
                defaultActiveFirstOption={gender}
                value={gender}
              >
                <Select.Option value="L">Laki-laki</Select.Option>
                <Select.Option value="P">Perempuan</Select.Option>
              </Select>
              <input type="hidden" name="gender" ref={register} />
            </Col>
          </Row>
          <Row gutter={[4, 16]}>
            <Col xs={24} sm={8}>
              <label className="ant-form-item-required">Agama</label>
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
              <label className="ant-form-item-required">Asal Universitas</label>
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
          <Row gutter={[4, 16]}>
            <Col xs={24} sm={8}>
              <label className="ant-form-item-required">Jurusan</label>
            </Col>
            <Col xs={24} sm={16}>
              <input
                className="ant-input"
                name="major"
                defaultValue={major}
                ref={register({ required: true })}
              />
              {!!errors.major && <Warning>Mohon mengisi jurusan</Warning>}
            </Col>
          </Row>
          <Row gutter={[4, 16]}>
            <Col xs={24} sm={8}>
              <label className="ant-form-item-required">Tahun Angkatan</label>
            </Col>
            <Col xs={24} sm={16}>
              <input
                className="ant-input"
                name="year_of_dedication"
                defaultValue={year_of_dedication}
                ref={register({ required: true })}
              />
              {!!errors.year_of_dedication && (
                <Warning>Mohon mengisi tahun angkatan</Warning>
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
