import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import moment from "moment";
import "moment/locale/id";

export default (csvData, fileName) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const dateNow = moment()
    .locale("id")
    .format("LL");
  const ws = XLSX.utils.json_to_sheet(csvData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array"
  });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, `${fileName} ${dateNow} ${fileExtension}`);
};
