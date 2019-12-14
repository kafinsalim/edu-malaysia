import React from "react";
import axios from "axios";
import {
  Spin,
  Input,
  Modal,
  Form,
  Radio,
  Card,
  Table,
  Button,
  DatePicker
} from "antd";
import { base_url, mockTeachersResponse } from "../../utils/api";
import { tableColumns } from "./constants";
import { Container } from "../../uikit";
import ModalAddTeacher from "./ModalAddTeacher";

const { Search } = Input;

const AddTeacherForm = Form.create({
  name: "form_add_teacher_in_modal"
})(
  class extends React.Component {
    onChange = (date, dateString) => {
      console.log(date, dateString);
    };
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      // const formItemLayout = {
      //   labelCol: { span: 6 },
      //   wrapperCol: { span: 14 }
      // };
      return (
        <Modal
          visible={visible}
          title="Add New Teacher"
          okText="Add"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Nama Depan">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message:
                      "Please input the Nama Depan of collection!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Nama Belakang">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message:
                      "Please input the Nama Belakang of collection!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Tempat Lahir">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message:
                      "Please input the Tempat Lahir of collection!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Tanggal Lahir">
              <DatePicker onChange={this.onChange} />
            </Form.Item>
            <br />
            <Form.Item className="collection-create-form_last-form-item">
              {getFieldDecorator("modifier", {
                initialValue: "male"
              })(
                <Radio.Group>
                  <Radio value="male">Pria</Radio>
                  <Radio value="female">Wanita</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <br />
            <Form.Item label="Agama">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Please input the Agama of collection!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Asal Universitas">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message:
                      "Please input the Asal Universitas of collection!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Jurusan">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Please input the Jurusan of collection!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Angkatan">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message:
                      "Please input the Angkatan of collection!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

const Teachers = props => {
  const [fetching, setFetching] = React.useState(false);
  const [teachers, setTeachers] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    function getTeachers() {
      setFetching(true);
      // await axios.get(`${base_url}/teachers`).then(response => {
      //   setTeachers(response.data);
      //   setFetching(false);
      // });
      setTimeout(function() {
        setTeachers(mockTeachersResponse);
        setFetching(false);
      }, 750);
    }
    getTeachers();
  }, []);

  console.log("render", teachers);
  return (
    <Card style={{ minHeight: "70%" }}>
      {fetching ? (
        <Container>
          <Spin />
        </Container>
      ) : (
        <>
          <Container>
            <Search
              placeholder="Cari Guru"
              onSearch={value => console.log(value)}
              style={{ width: "90%", marginRight: "10%" }}
            />
            <Button
              onClick={() => setModalVisible(true)}
              type="primary"
            >
              Tambah Data Guru
            </Button>
          </Container>
          <br />
          <Table
            dataSource={teachers}
            columns={tableColumns}
            rowKey="id"
          />
        </>
      )}
      <AddTeacherForm
        // wrappedComponentRef={saveFormRef}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onCreate={() => setModalVisible(false)}
      />
      {/* {modalVisible && <ModalAddTeacher />} */}
    </Card>
  );
};

export default Teachers;
