/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Icon, Input, Card, Button, message, Row, Col, Popconfirm, Spin } from "antd";
// import { formatedAssemblyTableSource, formatAssemblyForExport } from "./utils";
import { exportToXLSX, reqAssembly } from "../../utils";
import ModalAssemblyForm from "./ModalAssemblyForm";
const { Search } = Input;

const Assembly = props => {
  const [fetching, setFetching] = React.useState(false);
  const [assemblys, setAssembly] = React.useState([]);
  const [filter, setFilter] = React.useState(false);
  const [CLCId, setCLCId] = React.useState(null);
  const [modalForm, setModalForm] = React.useState(false);

  const refreshTableData = () => {
    console.log("refresh table data");
    setFetching(true);
    reqAssembly
      .getAllAssemblys(filter)
      .then(response => {
        setAssembly(response);
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

  // const onEdit = id => {
  //   console.log(`onEdit()`);
  //   console.log(`set CLCId:${CLCId}`);
  //   setCLCId(id);
  //   setModalForm(true);
  // };

  const onReleaseTeacher = id => {
    console.log(`onReleaseTeacher()`);
    reqAssembly
      .deleteAssembly(id)
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

  const openModal = clcId => {
    setCLCId(clcId);
    setModalForm(true);
  };

  return (
    <Card style={{ minHeight: "70%" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Search
            placeholder="Cari CLC atau Guru"
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
                // exportToXLSX(formatAssemblyForExport(assemblys), "Rekap Guru");
                exportToXLSX(assemblys, "Rekap Pemasangan Guru");
              }}
              loading={fetching}
              disabled={!assemblys.length}
              type="primary"
              icon="download"
            >
              Unduh
            </Button>
          </div>
        </Col>
      </Row>
      <br />
      <Row gutter={[16, 16]}>
        <Spin tip="Sedang Memuat..." spinning={fetching} style={{ marginTop: "15vh" }}>
          {assemblys.map(clc => {
            return (
              <Col key={clc.id} xs={24} sm={8}>
                <Card
                  size="small"
                  title={clc.name}
                  extra={
                    <>
                      <Button
                        onClick={() => openModal(clc.id)}
                        size="small"
                        style={{ marginRight: 8 }}
                      >
                        <Icon type="plus" />
                      </Button>
                      <Button onClick={() => openModal(clc.id)} size="small">
                        <Icon type="eye" />
                      </Button>
                    </>
                  }
                  style={{ minHeight: 200, maxHeight: 200, overflowY: "hidden" }}
                >
                  {clc.teachers && clc.teachers.length > 0 ? (
                    clc.teachers.map(i => (
                      <p key={i.id}>
                        {`${i.first_name} ${i.last_name}`}
                        <Popconfirm
                          title={`Hapus ${i.first_name} dari ${clc.name} ?`}
                          onConfirm={() =>
                            message.warning(`menghapus ${i.first_name} dari ${clc.name}`)
                          }
                          okText="Ya"
                          cancelText="Tidak"
                          placement="left"
                        >
                          <Icon
                            type="delete"
                            style={{ float: "right", cursor: "pointer" }}
                          />
                        </Popconfirm>
                      </p>
                    ))
                  ) : (
                    <p style={{ color: "gray" }}>belum ada guru</p>
                  )}
                </Card>
              </Col>
            );
          })}
        </Spin>
      </Row>
      <ModalAssemblyForm
        visible={modalForm}
        onClose={handleCloseModal}
        onSubmit={handleSuccessSubmitForm}
        CLCId={CLCId}
      />
    </Card>
  );
};

export default Assembly;
