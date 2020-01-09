import React from "react";
import { Icon, Input, Card, Table, Button, message, Row, Col } from "antd";
import { exportToXLSX, reqCLC } from "../../utils";
import { formatedCLCsTableSource } from "./utils";
import ModalClcForm from "./ModalClcForm";

const { Search } = Input;

const CLC = props => {
  const [fetching, setFetching] = React.useState(false);
  const [CLCs, setCLCs] = React.useState([]);
  const [filter, setFilter] = React.useState(false);
  const [CLCId, setCLCId] = React.useState(null);
  const [modalForm, setModalForm] = React.useState(false);

  const refreshTableData = () => {
    console.log("refresh table data");
    setFetching(true);
    reqCLC
      .getAllCLCs(filter)
      .then(response => {
        setCLCs(response);
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
    console.log(`set CLCId:${CLCId}`);
    setCLCId(id);
    setModalForm(true);
  };

  const onArchive = id => {
    console.log(`onArchive()`);
    reqCLC
      .deleteCLC(id)
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
    console.log("closing modal");
    setCLCId(null);
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
            placeholder="Cari CLC"
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
                // exportToXLSX(formatedCLCsTableSource(CLCs), "Rekap CLC");
                exportToXLSX(CLCs, "Rekap CLC");
              }}
              loading={fetching}
              disabled={!CLCs.length}
              type="primary"
              icon="download"
              style={{ marginRight: 16 }}
            >
              Unduh
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
        dataSource={CLCs}
        columns={formatedCLCsTableSource(onEdit, onArchive)}
        rowKey="id"
        style={{ overflowX: "scroll" }}
      />
      <ModalClcForm
        visible={modalForm}
        onClose={handleCloseModal}
        onSubmit={handleSuccessSubmitForm}
        CLCId={CLCId}
      />
    </Card>
  );
};

export default CLC;
