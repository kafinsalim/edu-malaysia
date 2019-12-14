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
import { base_url } from "../../utils/api";
import { Container } from "../../uikit";
import ModalAddTeacher from "./ModalAddTeacher";

const { Search } = Input;

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
              {getFieldDecorator("description")(
                <Input type="textarea" />
              )}
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

const Teachers = props => {
  const [fetching, setFetching] = React.useState(false);
  const [teachers, setTeachers] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    async function getTeachers() {
      setFetching(true);
      await axios.get(`${base_url}/teachers`).then(response => {
        setTeachers(response.data);
        setFetching(false);
      });
    }
    getTeachers();
  }, []);

  const columns = [
    {
      title: "Nama Depan",
      dataIndex: "first_name",
      key: "first_name"
    },
    {
      title: "Nama Belakang",
      dataIndex: "last_name",
      key: "last_name"
    },
    {
      title: "Tempat Lahir",
      dataIndex: "place_of_birth",
      key: "place_of_birth"
    },
    {
      title: "Tanggal Lahir",
      dataIndex: "date_of_birth",
      key: "date_of_birth"
    },
    {
      title: "Jenis Kelmain",
      dataIndex: "gender",
      key: "gender"
    },
    {
      title: "Agama",
      dataIndex: "religion",
      key: "religion"
    },
    {
      title: "Asal Universitas",
      dataIndex: "university",
      key: "university"
    },
    {
      title: "Jurusan",
      dataIndex: "major",
      key: "major"
    },
    {
      title: "Angkatan Tahapan",
      dataIndex: "year_of_dedication",
      key: "year_of_dedication"
    }
  ];

  console.log("render");
  return (
    <>
      {fetching ? (
        <Container>
          <Spin />
        </Container>
      ) : (
        <>
          <Container>
            <Search
              placeholder="Search Teacher"
              onSearch={value => console.log(value)}
              style={{ width: "90%", marginRight: "10%" }}
            />
            <Button onClick={() => setModalVisible(true)}>
              Add Teachers
            </Button>
          </Container>
          <br />
          <Table dataSource={teachers} columns={columns} />
        </>
      )}
      <CollectionCreateForm
        // wrappedComponentRef={saveFormRef}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onCreate={() => setModalVisible(false)}
      />
      {/* {modalVisible && <ModalAddTeacher />} */}
    </>
  );
};

export default Teachers;
