/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Popconfirm, Icon } from "antd";

const formatedCLCsTableSource = (onEdit, onArchive) => {
  return [
    {
      title: "Nama CLC",
      dataIndex: "name",
      key: "name",
      render: row => (
        <div style={{ whiteSpace: "nowrap" }}>
          <Icon type="question-circle" /> {row}
        </div>
      )
    },
    {
      title: "Level",
      dataIndex: "clc_level",
      key: "clc_level",
      render: row => row.substr(4).toUpperCase()
    },
    {
      title: "Kelas",
      dataIndex: "clc_level_data_support",
      key: "kelas",
      render: row =>
        row.student_per_class.map(i => (
          <span key={i.class_level} style={{ whiteSpace: "nowrap" }}>
            Kelas {i.class_level}
            <br />
          </span>
        ))
    },
    {
      title: "Siswa",
      dataIndex: "clc_level_data_support",
      key: "siswa",
      render: row =>
        row.student_per_class.map((item, index) => (
          <span key={index}>
            {item.total_class_student}
            <br />
          </span>
        ))
    },
    {
      title: "Total Siswa",
      dataIndex: "clc_level_data_support",
      key: "total_siswa",
      render: row => row.total_student_per_clc
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status"
    },
    {
      title: "Gugus",
      dataIndex: "gugus",
      key: "gugus"
    },
    {
      title: "Koordinat",
      dataIndex: "coordinate",
      key: "coordinate",
      render: row => <span>{`${row.lat}, ${row.long}`}</span>
    },
    {
      title: "Catatan",
      dataIndex: "note",
      key: "note"
    },
    {
      title: "Tindakan",
      key: "action",
      render: row => (
        <span>
          <a onClick={() => onEdit(row.id)}>edit</a>
          <br />
          <Popconfirm
            title="Apakah anda yakin mengarsipkan data ini?"
            onConfirm={() => onArchive(row.id)}
            okText="Ya"
            cancelText="Tidak"
            placement="left"
          >
            <a>arsipkan</a>
          </Popconfirm>
        </span>
      )
    }
  ];
};

const formatCLCsForExport = CLCs =>
  CLCs.map(item => {
    console.log("export clc", item);
    return true;
    //   return {
    //     "Nama Lengkap": `${item.first_name} ${item.last_name}`,
    //     "Tempat Lahir": item.place_of_birth,
    //     "Tanggal Lahir": item.date_of_birth,
    //     "Jenis Kelamin": item.gender,
    //     Agama: item.religion,
    //     "Asal Universitas": item.university,
    //     Jurusan: item.major,
    //     "Angkatan Tahapan": item.year_of_dedication
    //   };
  });

export { formatedCLCsTableSource, formatCLCsForExport };
