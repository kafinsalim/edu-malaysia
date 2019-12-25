/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Icon, Input, Card, Table, Button, message, Row, Col, Modal } from "antd";
// import { formatedAssemblyTableSource, formatAssemblyForExport } from "./utils";
import { exportToXLSX, reqAssembly } from "../../utils";
// import ModalAssemblyForm from "./ModalAssemblyForm";
const { Search } = Input;

const Assembly = props => {
  const [fetching, setFetching] = React.useState(false);
  const [assemblys, setAssembly] = React.useState([]);
  const [filter, setFilter] = React.useState(false);
  const [assemblyId, setAssemblyId] = React.useState(null);
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

  const onEdit = id => {
    console.log(`onEdit()`);
    console.log(`set assemblyId:${assemblyId}`);
    setAssemblyId(id);
    setModalForm(true);
  };

  const onArchive = id => {
    console.log(`onArchive()`);
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
    // if()
    console.log("closing modal");
    setAssemblyId(null);
    setModalForm(false);
  };

  const handleSuccessSubmitForm = () => {
    refreshTableData();
  };

  const openModal = () => {
    setModalForm(true);
  };

  const checkDetail = assemblyId => (
    <a href="#" style={{ fontSize: 10 }}>
      Lihat semua
    </a>
  );

  const generateCLCList = total => {
    const randomName = number => {
      if (number < 4) {
        return "Fidel Ramadhan";
      } else if (number >= 4 && number < 7) {
        return "Candi Can";
      } else if ((number = 9)) {
        return "Abdul El-Aziz Bakar";
      } else {
        return "Afrian";
      }
    };
    const randomNum = () => Math.floor(Math.random() * 10);
    const generateTeachers = () => {
      const totalTeacher = randomNum();
      if (totalTeacher) {
        return Array.from({ length: totalTeacher }, (v, i) => i).map(index => {
          if (index === 4) {
            return (
              <p style={{ textAlign: "right" }}>
                <a href="#" style={{ marginBottom: 0, lineHeight: "30px" }}>
                  ...lihat semua
                </a>
              </p>
            );
          } else {
            return (
              <p key={index} style={{ marginBottom: 0, lineHeight: "30px" }}>
                {randomName(randomNum())}
              </p>
            );
          }
        });
      } else {
        return <p>belum ada guru di clc ini</p>;
      }
    };
    return Array.from({ length: total }, (v, i) => i).map(n => (
      <Col key={n} xs={24} sm={8}>
        <Card
          size="small"
          title="SD TADIKA MESRA"
          extra={checkDetail()}
          style={{ minHeight: 200, maxHeight: 200, overflowY: "hidden" }}
        >
          {generateTeachers()}
        </Card>
      </Col>
    ));
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
      <Row gutter={[16, 16]}>{generateCLCList(14)}</Row>

      {/* <Table
        size="middle"
        loading={fetching}
        dataSource={assemblys}
        columns={formatedAssemblyTableSource(onEdit, onArchive)}
        rowKey="id"
        style={{ overflowX: "scroll" }}
      /> 
      <ModalAssemblyForm*/}
      <Modal
        visible={modalForm}
        onClose={handleCloseModal}
        onSubmit={handleSuccessSubmitForm}
        assemblyId={assemblyId}
        // selectedAssemblyData={selectedAssemblyData}
      />
    </Card>
  );
};

export default Assembly;
