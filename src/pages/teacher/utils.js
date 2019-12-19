/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import moment from "moment";
import "moment/locale/id";
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

const formatedColumns = [
  {
    title: "Nama Lengkap",
    key: "nama_lengkap",
    render: (text, row) => `${row.first_name} ${row.last_name}`
  },
  {
    title: "Tempat Tanggal Lahir",
    key: "ttl",
    render: (text, row) => (
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

const formatedTeachers = data => {
  console.log(data);
  return data.map(i => ({
    id: i.id,
    name: `${i.first_name} ${i.last_name}`,
    ttl: `${i.place_of_birth},<br/> ${moment(i.date_of_birth)
      .locale("id")
      .format("LL")}`,
    gender: i.gender,
    religion: i.religion,
    university_and_major: `${i.university},<br/> ${i.major}`,
    year_of_dedication: i.year_of_dedication
  }));
};

// const formatedColumns = [
//   {
//     title: "Nama Lengkap",
//     dataIndex: "name",
//     key: "first_name"
//   },
//   {
//     title: "Tempat Tanggal Lahir",
//     dataIndex: "ttl",
//     key: "ttl"
//   },
//   {
//     title: "Jenis Kelamin",
//     dataIndex: "gender",
//     key: "gender"
//   },
//   {
//     title: "Agama",
//     dataIndex: "religion",
//     key: "religion"
//   },
//   {
//     title: "Asal Universitas",
//     dataIndex: "university_and_major",
//     key: "university"
//   },
//   {
//     title: "Angkatan Tahapan",
//     dataIndex: "year_of_dedication",
//     key: "year_of_dedication"
//   },
//   {
//     title: "Tindakan",
//     key: "action",
//     render: (text, record) => (
//       <span>
//         <a onClick={() => message.success(`edit ${record.id}`)}>edit</a>
//         <br />
//         <Popconfirm
//           title="Apakah anda yakin menghapus data ini?"
//           onConfirm={confirm}
//           onCancel={cancel}
//           okText="Yes"
//           cancelText="No"
//           placement="left"
//         >
//           <a onClick={() => console.log(`hapus ${record.id}`)}>hapus</a>
//         </Popconfirm>
//       </span>
//     )
//   }
// ];

export { tableColumns, formatedColumns, formatedTeachers };
