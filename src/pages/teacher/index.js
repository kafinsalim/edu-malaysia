import React from "react";
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
import { base_url, fetchAPI, mockTeachersResponse } from "../../utils/api";
import { tableColumns, formatedColumns, formatedTeachers } from "./utils";
import { Container, Spinner } from "../../uikit";
import AddTeacherForm from "./AddTeacherForm";

const { Search } = Input;

const Teachers = props => {
  const [fetching, setFetching] = React.useState(false);
  const [teachers, setTeachers] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);

  const refreshTableData = () => {
    setFetching(true);
    fetchAPI("teachers").then(response => {
      setTeachers(response.data);
      setFetching(false);
    });
  };

  React.useEffect(() => {
    function getTeachers() {
      setFetching(true);
      fetchAPI("teachers").then(response => {
        setTeachers(response.data);
        setFetching(false);
      });
    }
    // function getTeachers() {
    //   setFetching(true);
    //   setTimeout(function() {
    //     // setTeachers(formatedTeachers(mockTeachersResponse));
    //     setTeachers(mockTeachersResponse);
    //     setFetching(false);
    //   }, 750);
    // }
    getTeachers();
  }, []);

  // console.log("render", teachers);
  return (
    <Card style={{ minHeight: "70%" }}>
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
        size="middle"
        loading={fetching}
        dataSource={teachers}
        columns={formatedColumns}
        rowKey="id"
        style={{ overflowX: "scroll" }}
      />
      <Modal
        title="Tambahkan data Guru"
        style={{ top: 32 }}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onCreate={() => console.log("onCreate")}
        footer={null}
      >
        <AddTeacherForm
          closeModal={() => {
            setModalVisible(false);
            refreshTableData();
          }}
        />
      </Modal>
    </Card>
  );
};

export default Teachers;
