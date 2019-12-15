import React from "react";
import { Popconfirm, message } from "antd";

function confirm(e) {
  console.log(e);
  message.success("Click on Yes");
}

function cancel(e) {
  console.log(e);
  message.error("Click on No");
}

const tableColumns = [
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
    title: "Jenis Kelamin",
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
  },
  {
    title: "Tindakan",
    key: "action",
    render: (text, record) => (
      <span>
        <a onClick={() => message.success(`edit ${record.id}`)}>edit</a>
        <br />
        <Popconfirm
          title="Apakah anda yakin menghapus data ini?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
          placement="left"
        >
          <a onClick={() => console.log(`hapus ${record.id}`)}>hapus</a>
        </Popconfirm>
      </span>
    )
  }
];

export { tableColumns };
