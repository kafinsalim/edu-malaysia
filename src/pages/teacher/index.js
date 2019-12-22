import React from "react";
import { Icon, Input, Card, Table, Button, message, Row, Col } from "antd";
import { fetchAPI, mockTeachersResponse } from "../../utils/serviceAPI";
import { exportToXLSX } from "../../utils/export";
import { formatedTeachersTableSource, formatTeachersForExport } from "./utils";
import ModalTeacherForm from "./ModalTeacherForm";
const { Search } = Input;

const Teachers = props => {
  const [fetching, setFetching] = React.useState(false);
  const [teachers, setTeachers] = React.useState([]);
  const [editTeacherById, setEditTeacherById] = React.useState(null);
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
    console.log(`set editTeacherById:${editTeacherById}`);
    setEditTeacherById(id);
    setModalForm(true);
  };

  const onArchive = () => {
    message.success("Berhasil diarsipkan, namun fitur dalam pengembangan");
  };

  const closeModal = () => {
    setModalForm(false);
    setEditTeacherById(null);
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
            }}
          />
        </Col>
        <Col xs={24} sm={12}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => {
                setFetching(true);
                message.loading("sedang mengunduh..", 1, () =>
                  setFetching(false)
                );
                exportToXLSX(formatTeachersForExport(teachers), "Rekap Guru");
              }}
              loading={fetching}
              disabled={!teachers.length}
              type="primary"
              icon="download"
              style={{ marginRight: 16 }}
            >
              Unduh
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
        dataSource={teachers}
        columns={formatedTeachersTableSource(onEdit, onArchive)}
        rowKey="id"
        style={{ overflowX: "scroll" }}
      />

      <ModalTeacherForm
        visible={modalForm}
        handleCloseModal={closeModal}
        handleSubmitForm={refreshTableData}
        editTeacherById={editTeacherById}
      />
    </Card>
  );
};

export default Teachers;
