import React from "react";
import { Icon, Input, Card, Table, Button, message, Row, Col } from "antd";
import { formatedTeachersTableSource, formatTeachersForExport } from "./utils";
import { exportToXLSX, reqTeacher } from "../../utils";
import ModalTeacherForm from "./ModalTeacherForm";
const { Search } = Input;

const Teachers = props => {
  const [fetching, setFetching] = React.useState(false);
  const [teachers, setTeachers] = React.useState([]);
  const [filter, setFilter] = React.useState(false);
  const [teacherId, setTeacherId] = React.useState(null);
  const [modalForm, setModalForm] = React.useState(false);

  const refreshTableData = () => {
    console.log("refresh table data");
    setFetching(true);
    reqTeacher
      .getAllTeachers(filter)
      .then(response => {
        setTeachers(response);
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

  React.useEffect(() => {
    console.log("useEffect by filter", filter);
    refreshTableData();
  }, [filter]);

  const onEdit = id => {
    console.log(`onEdit()`);
    console.log(`set teacherId:${teacherId}`);
    setTeacherId(id);
    setModalForm(true);
  };

  const onArchive = id => {
    console.log(`onArchive()`);
    reqTeacher
      .deleteTeacher(id)
      .then(response => {
        message.success("Berhasil mengarsipkan");
        refreshTableData();
        console.log(response);
      })
      .catch(error => {
        message.error("Gagal mengarsipkan");
        console.log(error);
      });
  };

  const handleCloseModal = () => {
    // if()
    console.log("closing modal");
    setTeacherId(null);
    setModalForm(false);
  };

  const handleSuccessSubmitForm = () => {
    refreshTableData();
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
              console.log(value.trim());
              setFilter(value.trim());
            }}
          />
        </Col>
        <Col xs={24} sm={12}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => {
                setFetching(true);
                message.loading("sedang mengunduh..", 1, () => setFetching(false));
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
        onClose={handleCloseModal}
        onSubmit={handleSuccessSubmitForm}
        teacherId={teacherId}
        // selectedTeacherData={selectedTeacherData}
      />
    </Card>
  );
};

export default Teachers;
