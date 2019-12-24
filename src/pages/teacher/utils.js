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

// const mockTeachers = [
//   {
//     id: "5dfd3bcbd82b317c610581bc",
//     created_at: "2019-12-20T21:23:23.499Z",
//     updated_at: "2019-12-20T21:23:23.499Z",
//     first_name: "Gur",
//     last_name: "uhuy",
//     place_of_birth: "Bandung",
//     date_of_birth: "2001-01-01",
//     gender: "L",
//     religion: "-",
//     university: "polban",
//     major: "teknik",
//     year_of_dedication: "05"
//   },
//   {
//     id: "5dfd0506d82b317c614584be",
//     created_at: "2019-12-20T17:29:42.747Z",
//     updated_at: "2019-12-20T17:29:42.747Z",
//     first_name: "Afnan",
//     last_name: "Fuadi Hamzah",
//     place_of_birth: "Banten",
//     date_of_birth: "2004-12-12",
//     gender: "L",
//     religion: "Budha",
//     university: "ITB",
//     major: "matematika",
//     year_of_dedication: "04"
//   },
//   {
//     id: "5dfd0300d82b317c613e3bf2",
//     created_at: "2019-12-20T17:21:04.188Z",
//     updated_at: "2019-12-20T17:21:04.188Z",
//     first_name: "haris",
//     last_name: "nasution",
//     place_of_birth: "Bandung",
//     date_of_birth: "1992-12-12",
//     gender: "P",
//     religion: "Islam",
//     university: "Polban",
//     major: "Informatika",
//     year_of_dedication: "03"
//   },
//   {
//     id: "5dfbabecd82b317c61d6808f",
//     created_at: "2019-12-19T16:57:16.765Z",
//     updated_at: "2019-12-19T16:57:16.765Z",
//     first_name: "poi",
//     last_name: "p",
//     place_of_birth: "oi",
//     date_of_birth: "poi",
//     gender: "poi",
//     religion: "po",
//     university: "ip",
//     major: "oi",
//     year_of_dedication: "poi"
//   },
//   {
//     id: "5dfbaa5ad82b317c61d0d2a0",
//     created_at: "2019-12-19T16:50:34.72Z",
//     updated_at: "2019-12-19T16:50:34.72Z",
//     first_name: "ka",
//     last_name: "fin",
//     place_of_birth: "b",
//     date_of_birth: "2",
//     gender: "p",
//     religion: "ag",
//     university: "pol",
//     major: "el",
//     year_of_dedication: "11"
//   },
//   {
//     id: "5dfba766d82b317c61c6bf5d",
//     created_at: "2019-12-19T16:37:58.615Z",
//     updated_at: "2019-12-19T16:37:58.615Z",
//     first_name: "kafin",
//     last_name: "salim",
//     place_of_birth: "bandung",
//     date_of_birth: "1999-11-11",
//     gender: "L",
//     religion: "Izlam",
//     university: "polbang",
//     major: "elegtro",
//     year_of_dedication: "07"
//   },
//   {
//     id: "5df1f393d82b317c617dc2b9",
//     created_at: "2019-12-12T08:00:19.327Z",
//     updated_at: "2019-12-12T08:00:19.327Z",
//     first_name: "Fidel",
//     last_name: "Ramadhan",
//     place_of_birth: "DKI Jakarta",
//     date_of_birth: "1997-12-31",
//     gender: "L",
//     religion: "Muslim",
//     university: "Institut Teknologi Bandung",
//     major: "teknik informatika",
//     year_of_dedication: "06"
//   },
//   {
//     id: "5df4e8fed82b317c610747be",
//     created_at: "0001-01-01T00:00:00Z",
//     updated_at: "2019-12-15T09:59:45.226Z",
//     first_name: "Asep updated",
//     last_name: "Last",
//     place_of_birth: "DKI Jakarta",
//     date_of_birth: "1997-12-31",
//     gender: "L",
//     religion: "Kadang Muslim",
//     university: "Institut Teknologi Bandung",
//     major: "teknik informatika",
//     year_of_dedication: "06"
//   },
//   {
//     id: "5df8f495d82b317c61d0f6dc",
//     created_at: "0001-01-01T00:00:00Z",
//     updated_at: "2019-12-20T20:02:04.566Z",
//     first_name: "Fidelis",
//     last_name: "Ramy",
//     place_of_birth: "DKI Jakarta",
//     date_of_birth: "1997-12-31",
//     gender: "L",
//     religion: "Muslim",
//     university: "Institut Teknologi Bandung",
//     major: "teknik informatika",
//     year_of_dedication: "061"
//   },
//   {
//     id: "5dfbab73d82b317c61d50c81",
//     created_at: "0001-01-01T00:00:00Z",
//     updated_at: "2019-12-20T19:14:12.513Z",
//     first_name: "Jafri",
//     last_name: "Almabrur bin Abdur",
//     place_of_birth: "NTT",
//     date_of_birth: "1987-11-11",
//     gender: "L",
//     religion: "-",
//     university: "ITENAS",
//     major: "fisika",
//     year_of_dedication: "12"
//   },
//   {
//     id: "5dfbafcfd82b317c61e33cb4",
//     created_at: "0001-01-01T00:00:00Z",
//     updated_at: "2019-12-20T19:43:01.376Z",
//     first_name: "Ujang2",
//     last_name: "Baja ringan",
//     place_of_birth: "Banten",
//     date_of_birth: "1996-02-02",
//     gender: "L",
//     religion: "Budha",
//     university: "Universitas Terbuka",
//     major: "Telecommunication Electornics Engineering",
//     year_of_dedication: "04"
//   },
//   {
//     id: "5dfd1041d82b317c616d7e19",
//     created_at: "0001-01-01T00:00:00Z",
//     updated_at: "2019-12-20T18:39:59.945Z",
//     first_name: "update",
//     last_name: "Ramadhan",
//     place_of_birth: "DKI Jakarta",
//     date_of_birth: "1997-12-31",
//     gender: "L",
//     religion: "update",
//     university: "Institut Teknologi Bandung",
//     major: "teknik informatika",
//     year_of_dedication: "06"
//   },
//   {
//     id: "5dfd17c7d82b317c618818a1",
//     created_at: "0001-01-01T00:00:00Z",
//     updated_at: "2019-12-20T19:40:25.117Z",
//     first_name: "Ali",
//     last_name: "Fuadi Hamzah",
//     place_of_birth: "Banten",
//     date_of_birth: "2004-12-12",
//     gender: "L",
//     religion: "Budha",
//     university: "ITB",
//     major: "matematika",
//     year_of_dedication: "04"
//   },
//   {
//     id: "5dfd1a67d82b317c619172fb",
//     created_at: "0001-01-01T00:00:00Z",
//     updated_at: "2019-12-20T19:44:24.785Z",
//     first_name: "Imran",
//     last_name: "Fuadi Hamzah",
//     place_of_birth: "Banten",
//     date_of_birth: "2004-12-12",
//     gender: "L",
//     religion: "Budha",
//     university: "ITB",
//     major: "matematika",
//     year_of_dedication: "04"
//   }
// ];

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
