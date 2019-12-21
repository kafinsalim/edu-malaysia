import React from "react";
import { Icon, Input, Card, Table, Button, message, Row, Col } from "antd";
import { fetchAPI, mockClcResponse } from "../../utils/api";
import { formatedClcsColumn } from "./utils";
import ModalClcForm from "./ModalClcForm";

const { Search } = Input;

const Clc = props => {
  const [fetching, setFetching] = React.useState(false);
  const [clcs, setClc] = React.useState([]);
  // const [filterActive, setFilterActive] = React.useState(true);
  // const [filterValue, setFilterValue] = React.useState("");
  const [editClcId, setEditClcId] = React.useState(null);
  const [modalForm, setModalForm] = React.useState(false);

  const refreshTableData = () => {
    setFetching(true);
    fetchAPI("clcs")
      .then(response => {
        setClc(response.data);
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
    console.log(`set editClcId:${editClcId}`);
    setEditClcId(id);
    setModalForm(true);
  };

  const onArchive = () => {
    message.success("Berhasil diarsipkan, namun fitur dalam pengembangan");
  };

  const closeModal = () => {
    setModalForm(false);
    setEditClcId(null);
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <Button
              onClick={openModal}
              type="primary"
              style={{ marginRight: 16 }}
            >
              <Icon type="file-excel" /> Unduh
            </Button>
            <Button onClick={openModal} type="primary">
              <Icon type="plus" /> CLC
            </Button>
          </div>
        </Col>
      </Row>
      <br />
      <Table
        size="middle"
        loading={fetching}
        dataSource={clcs}
        columns={formatedClcsColumn(onEdit, onArchive)}
        rowKey="id"
        style={{ overflowX: "scroll" }}
      />

      <ModalClcForm
        visible={modalForm}
        handleCloseModal={closeModal}
        handleSubmitForm={() => {
          closeModal();
          refreshTableData();
        }}
        type={editClcId ? "edit" : "add"}
        editClcId={editClcId}
      />
    </Card>
  );
};

export default Clc;
