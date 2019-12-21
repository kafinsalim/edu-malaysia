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
        <div>
          <Icon type="question-circle" /> {row}
        </div>
      )
    },
    {
      title: "Level",
      dataIndex: "clc_level",
      key: "clc_level",
      render: row => {
        if (row.clc_level) {
          return row.clc_level.substr(4).toUpperCase();
        }
        return "-";
      }
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
