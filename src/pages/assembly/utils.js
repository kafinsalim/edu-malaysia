// const generateCLCList = total => {
//   const randomName = number => {
//     if (number < 4) {
//       return "Fidel Ramadhan";
//     } else if (number >= 4 && number < 7) {
//       return "Candi Can";
//     } else if ((number = 9)) {
//       return "Abdul El-Aziz Bakar";
//     } else {
//       return "Afrian";
//     }
//   };
//   const randomNum = () => Math.floor(Math.random() * 10);
//   const generateTeachers = () => {
//     const totalTeacher = randomNum();
//     if (totalTeacher) {
//       return Array.from({ length: totalTeacher }, (v, i) => i).map(index => {
//         if (index === 4) {
//           return (
//             <p style={{ textAlign: "right" }}>
//               <a href="#" style={{ marginBottom: 0, lineHeight: "30px" }}>
//                 ...lihat semua
//               </a>
//             </p>
//           );
//         } else {
//           return (
//             <p key={index} style={{ marginBottom: 0, lineHeight: "30px" }}>
//               {randomName(randomNum())}
//             </p>
//           );
//         }
//       });
//     } else {
//       return <p>belum ada guru di clc ini</p>;
//     }
//   };
//   return Array.from({ length: total }, (v, i) => i).map(n => (
//     <Col key={n} xs={24} sm={8}>
//       <Card
//         size="small"
//         title="SD TADIKA MESRA"
//         extra={checkDetail()}
//         style={{ minHeight: 200, maxHeight: 200, overflowY: "hidden" }}
//       >
//         {generateTeachers()}
//       </Card>
//     </Col>
//   ));
// };
