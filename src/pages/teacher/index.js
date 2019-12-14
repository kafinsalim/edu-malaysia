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
  Button
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
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Add New Teacher"
          okText="Add"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Teacher">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Please input the Teacher of collection!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator("description")(
                <Input type="textarea" />
              )}
            </Form.Item>
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
