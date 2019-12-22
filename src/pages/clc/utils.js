/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import moment from "moment";
import "moment/locale/id";
import { Popconfirm, Icon } from "antd";

const formatedClcsColumn = (onEdit, onArchive, filter = "") => {
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
          <span style={{ whiteSpace: "nowrap" }}>
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
        row.student_per_class.map(i => (
          <span>
            {i.total_class_student}
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
    // (clc_level_data_support: {
    //   total_student_per_clc: 1140,
    //   student_per_class: [
    //     {
    //       class_level: 1,
    //       total_class_student: 111
    //     },
    //     {
    //       class_level: 2,
    //       total_class_student: 112
    //     },
    //     {
    //       class_level: 3,
    //       total_class_student: 223
    //     },
    //     {
    //       class_level: 4,
    //       total_class_student: 114
    //     },
    //     {
    //       class_level: 5,
    //       total_class_student: 115
    //     },
    //     {
    //       class_level: 6,
    //       total_class_student: 116
    //     }
    //   ]
    // }),
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
      render: row => (
        <span>{`${row.lat
          .toString()
          .substr(0, 4)}, ${row.long.toString().substr(0, 4)}`}</span>
      )
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
            // onCancel={cancel}
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

export { formatedClcsColumn };
