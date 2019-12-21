import React from "react";
import { Icon, Input, Card, Table, Button, message, Row, Col } from "antd";
import { fetchAPI, mockTeachersResponse } from "../../utils/api";
import { formatedTeachersColumn } from "./utils";
import ModalTeacherForm from "./ModalTeacherForm";

const { Search } = Input;

const Teachers = props => {
  const [fetching, setFetching] = React.useState(false);
  const [teachers, setTeachers] = React.useState([]);
  // const [filterActive, setFilterActive] = React.useState(true);
  // const [filterValue, setFilterValue] = React.useState("");
  const [editTeacherId, setEditTeacherId] = React.useState(null);
  const [modalForm, setModalForm] = React.useState(false);

  const refreshTableData = () => {
    setFetching(true);
    fetchAPI("teachers?sort=first_name")
      .then(response => {
        setTeachers(response.data);
        setFetching(false);
      })
      .catch(e => {
        setFetching(false);
        message.warning("terdapat masalah jaringan");
        console.error(e);
      });
  };

  React.useEffect(() => {
    refreshTableData();
  }, []);

  const onEdit = id => {
    console.log(`set editTeacherId:${editTeacherId}`);
    setEditTeacherId(id);
    setModalForm(true);
  };

  const onArchive = () => {
    message.success("Berhasil diarsipkan, namun fitur dalam pengembangan");
  };

  const closeModal = () => {
    setModalForm(false);
    setEditTeacherId(null);
  };

  const openModal = () => {
    setModalForm(true);
  };

  return (
    <Card style={{ minHeight: "70%" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Search
            placeholder="Cari Guru"
            onSearch={value => {
              console.log(value);
              // console.log(`filterValue ${filterValue}`);
              // setFilterValue(value);
            }}
          />
        </Col>
        <Col xs={24} sm={12}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={openModal}
              type="primary"
              style={{ marginRight: 16 }}
            >
              <Icon type="file-excel" /> Unduh
            </Button>
            <Button onClick={openModal} type="primary">
              <Icon type="plus" /> Guru
            </Button>
          </div>
        </Col>
      </Row>
      <br />
      <Table
        size="middle"
        loading={fetching}
        // filtered={filterActive}
        // filteredValue={filterValue}
        // onChange={() => {
        //   console.log(filterActive, filterValue);
        //   refreshTableData();
        // }}
        dataSource={teachers}
        columns={formatedTeachersColumn(onEdit, onArchive)}
        rowKey="id"
        style={{ overflowX: "scroll" }}
      />

      <ModalTeacherForm
        visible={modalForm}
        handleCloseModal={closeModal}
        handleSubmitForm={() => {
          closeModal();
          refreshTableData();
        }}
        type={editTeacherId ? "edit" : "add"}
        editTeacherId={editTeacherId}
      />
    </Card>
  );
};

export default Teachers;
