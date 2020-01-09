/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import moment from "moment";
import { Popconfirm } from "antd";

const formatedTeachersTableSource = (onEdit, onArchive) => {
  return [
    {
      title: "Nama Lengkap",
      key: "nama_lengkap",
      render: row => `${row.first_name} ${row.last_name}`
    },
    {
      title: "Tempat Tanggal Lahir",
      key: "ttl",
      render: row => (
        <span>
          {row.place_of_birth + ","}
          <br />
          {moment(row.date_of_birth)
            .locale("id")
            .format("LL")}
        </span>
      )
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
      key: "university",
      render: (text, row) => (
        <span>
          {row.university + ","}
          <br />
          {row.major}
        </span>
      )
    },
    {
      title: "Angkatan Tahapan",
      dataIndex: "year_of_dedication",
      key: "year_of_dedication"
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

const formatTeachersForExport = teachers =>
  teachers.map(item => {
    return {
      "Nama Lengkap": `${item.first_name} ${item.last_name}`,
      "Tempat Lahir": item.place_of_birth,
      "Tanggal Lahir": item.date_of_birth,
      "Jenis Kelamin": item.gender,
      Agama: item.religion,
      "Asal Universitas": item.university,
      Jurusan: item.major,
      "Angkatan Tahapan": item.year_of_dedication
    };
  });

export { formatedTeachersTableSource, formatTeachersForExport };
