import React from "react";
import useForm from "react-hook-form";
import axios from "axios";
import styled from "styled-components";
import { BASE_URL, fetchAPI } from "../../utils/serviceAPI";
import {
  lowerCaseStringInObject,
  capitalizeFirstLetterStringInObject
} from "../../utils";
import {
  Form,
  Input,
  Modal,
  Select,
  DatePicker,
  message,
  Row,
  Col,
  Spin
} from "antd";
import moment from "moment";
// import "moment/locale/id";

const Warning = styled.p`
  color: #bf1650;
  margin: 0.5em auto 0px 4px;
  &::before {
    display: inline;
    content: "⚠ ";
  }
`;

const LabelColumn = styled(Col)`
  line-height: 32px;
  text-align: right;
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
          console.log(
            "editing teacher",
            capitalizeFirstLetterStringInObject(response.data)
          );
          setFormData(capitalizeFirstLetterStringInObject(response.data));
          setFetching(false);
        })
        .catch(e => {
          setFetching(false);
          handleCloseModal();
          message.warning("terdapat masalah jaringan");
          console.error(e);
        });
    }
    if (editTeacherById) {
      getTeacher(editTeacherById);
    } else {
      setFormData({});
    }
  }, [editTeacherById]);

  const onSubmit = async data => {
    // lowercase all string
    const cleanedData = lowerCaseStringInObject(data);
    // form submit function which will invoke after successful validation
    setFetching(true);
    if (!editTeacherById) {
      try {
        await axios.post(`${BASE_URL}/teacher`, cleanedData);
        setFetching(false);
        handleSubmitForm();
        handleCloseModal();
        message.success("Berhasil menyimpan data !");
        document.getElementById("teacher").reset();
      } catch (error) {
        setFetching(false);
        message.warning("terdapat masalah jaringan");
        console.log("catch", error);
      }
      console.log("submited add ", cleanedData);
    } else {
      try {
        const { id } = formData;
        console.log(`editing with id ${id}`);
        if (!id) {
          message.warning("terdapat masalah jaringan");
          console.log(`problem but editTeacherById is ${editTeacherById}`);
        }
        await axios.put(`${BASE_URL}/teacher/${id}`, cleanedData);
        setFetching(false);
        handleSubmitForm();
        handleCloseModal();
        message.success("Berhasil melakukan edit cleanedData!");
        document.getElementById("teacher").reset();
      } catch (error) {
        setFetching(false);
        message.warning("terdapat masalah jaringan");
        console.log("catch", error);
      }
      console.warn("submited edit ", cleanedData);
    }
  };

  // you can watch individual input by pass the name of the input
  console.log(watch(), errors);
  const {
    first_name,
    last_name,
    place_of_birth,
    date_of_birth,
    gender,
    religion,
    university,
    major,
    year_of_dedication
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
        <Form onSubmit={handleSubmit(onSubmit)} id="teacher">
          <Row gutter={[16, 12]}>
            <LabelColumn xs={24} sm={8}>
              <label className="ant-form-item-required">Nama Depan : </label>
            </LabelColumn>
            <Col xs={24} sm={16}>
              <Input
                className="ant-input"
                name="first_name"
                id="first_name"
                defaultValue={first_name}
                ref={register({ required: true })}
              />
              {!!errors.first_name && (
                <Warning>Mohon mengisi nama depan</Warning>
              )}
            </Col>
          </Row>
          <Row gutter={[16, 12]}>
            <LabelColumn xs={24} sm={8}>
              <label className="ant-form-item">Nama Belakang : </label>
            </LabelColumn>
            <Col xs={24} sm={16}>
              <Input
                className="ant-input"
                name="last_name"
                defaultValue={last_name}
                ref={register}
              />
            </Col>
          </Row>
          <Row gutter={[16, 12]}>
            <LabelColumn xs={24} sm={8}>
              <label className="ant-form-item-required">Tempat Lahir : </label>
            </LabelColumn>
            <Col xs={24} sm={16}>
              <Input
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
          <Row gutter={[16, 12]}>
            <LabelColumn xs={24} sm={8}>
              <label className="ant-form-item-required">Tanggal Lahir : </label>
            </LabelColumn>
            <Col xs={24} sm={16}>
              <DatePicker
                onChange={e => {
                  setValue("date_of_birth", e.format("YYYY-MM-DD"));
                }}
                showToday={false}
                placeholder="Pilih Tanggal Lahir"
                format={"YYYY-MM-DD"}
                style={{ width: "100%" }}
              />
              <Input
                type="hidden"
                defaultValue={date_of_birth}
                name="date_of_birth"
                ref={register}
              />
            </Col>
          </Row>
          <Row gutter={[16, 12]}>
            <LabelColumn xs={24} sm={8}>
              <label className="ant-form-item-required">Jenis Kelamin : </label>
            </LabelColumn>
            <Col xs={24} sm={16}>
              <Select
                onChange={e => {
                  setValue("gender", e);
                }}
                defaultValue={gender}
                placeholder="Pilih Jenis Kelamin"
              >
                <Select.Option value="L">Laki-laki</Select.Option>
                <Select.Option value="P">Perempuan</Select.Option>
              </Select>
              <Input
                type="hidden"
                name="gender"
                defaultValue={gender}
                ref={register}
              />
            </Col>
          </Row>
          <Row gutter={[16, 12]}>
            <LabelColumn xs={24} sm={8}>
              <label className="ant-form-item-required">Agama : </label>
            </LabelColumn>
            <Col xs={24} sm={16}>
              <Input
                className="ant-input"
                name="religion"
                defaultValue={religion}
                ref={register({ required: true })}
              />
            </Col>
          </Row>
          <Row gutter={[16, 12]}>
            <LabelColumn xs={24} sm={8}>
              <label className="ant-form-item-required">
                Asal Universitas :
              </label>
            </LabelColumn>
            <Col xs={24} sm={16}>
              <Input
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
          <Row gutter={[16, 12]}>
            <LabelColumn xs={24} sm={8}>
              <label className="ant-form-item-required">Jurusan : </label>
            </LabelColumn>
            <Col xs={24} sm={16}>
              <Input
                className="ant-input"
                name="major"
                defaultValue={major}
                ref={register({ required: true })}
              />
              {!!errors.major && <Warning>Mohon mengisi jurusan</Warning>}
            </Col>
          </Row>
          <Row gutter={[16, 12]}>
            <LabelColumn xs={24} sm={8}>
              <label className="ant-form-item-required">Tahun Angkatan :</label>
            </LabelColumn>
            <Col xs={24} sm={16}>
              <Select
                onChange={e => {
                  setValue("year_of_dedication", e);
                }}
                placeholder="Pilih Tahun Angkatan"
                defaultValue={year_of_dedication}
              >
                <Select.Option value="06">06</Select.Option>
                <Select.Option value="07">07</Select.Option>
                <Select.Option value="08">08</Select.Option>
                <Select.Option value="09">09</Select.Option>
                <Select.Option value="10">10</Select.Option>
              </Select>
              <Input
                type="hidden"
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
                <button
                  type="submit"
                  className="ant-btn ant-btn-primary"
                  style={{ marginTop: 16 }}
                >
                  Simpan
                </button>
              </center>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
}
