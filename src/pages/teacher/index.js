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
  DatePicker,
  message
} from "antd";
import { base_url, mockTeachersResponse } from "../../utils/api";
import { tableColumns } from "./constants";
import { Container, Spinner } from "../../uikit";
import AddTeacherForm from "./AddTeacherForm";

const { Search } = Input;

const Teachers = props => {
  const [fetching, setFetching] = React.useState(false);
  const [teachers, setTeachers] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    // function getTeachers() {
    async function getTeachers() {
      setFetching(true);
      await axios.get(`${base_url}/teachers`).then(response => {
        setTeachers(response.data);
        setFetching(false);
      });
      // setTimeout(function() {
      //   setTeachers(mockTeachersResponse);
      //   setFetching(false);
      // }, 750);
    }
    getTeachers();
  }, []);

  // console.log("render", teachers);
  return (
    <Card style={{ minHeight: "70%" }}>
      {fetching ? (
        <Spinner />
      ) : (
        <>
          <Container>
            <Search
              placeholder="Cari Guru"
              onSearch={value => console.log(value)}
              style={{ width: "90%", marginRight: "10%" }}
            />
            <Button onClick={() => setModalVisible(true)} type="primary">
              Tambah Data Guru
            </Button>
          </Container>
          <br />
          <Table
            dataSource={teachers}
            columns={tableColumns}
            rowKey="id"
            style={{ overflowX: "scroll" }}
          />
        </>
      )}
      <Modal
        title="Tambahkan data Guru"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onCreate={() => console.log("onCreate")}
      >
        <AddTeacherForm />
      </Modal>
    </Card>
  );
};

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new collection"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Please input the title of collection!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator("description")(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item className="collection-create-form_last-form-item">
              {getFieldDecorator("modifier", {
                initialValue: "public"
              })(
                <Radio.Group>
                  <Radio value="public">Public</Radio>
                  <Radio value="private">Private</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

export default Teachers;
