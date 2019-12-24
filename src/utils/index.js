import axios from "axios";
import exportToXLSX from "./export";
import { BASE_URL, fetchAPI } from "./serviceAPI";

const capitalizeFirstLetter = string =>
  typeof string === "string"
    ? string.charAt(0).toUpperCase() + string.substring(1)
    : null;

const lowerCaseStringInObject = data => {
  const result = {};
  Object.keys(data).forEach(key => {
    if (typeof data[key] === "string") {
      result[key] = data[key].toLowerCase();
    } else {
      result[key] = data[key];
    }
  });
  return result;
};

const capitalizeFirstLetterStringInObject = data => {
  const result = {};
  Object.keys(data).forEach(key => {
    if (typeof data[key] === "string") {
      result[key] = data[key]
        .split(" ")
        .map(string => {
          // also check for "-"" like in "Al-Falah" neither it will bi "Al-falah"
          if (string.includes("-")) {
            return string.split("-");
          } else {
            return string;
          }
        })
        .flat()
        .map(string => capitalizeFirstLetter(string))
        .join(" ");
    } else {
      result[key] = data[key];
    }
  });
  return result;
};

const reqTeacher = {
  // TODO: make all format fix, return response status or nagh ? but i have to handle strings
  getAllTeachers: async filter => {
    let endpoint = `${BASE_URL}/teachers`;
    if (filter) endpoint += `?search=${filter}`;
    console.log("getAllTeachers", endpoint);
    return await axios
      .get(endpoint)
      .then(response => response.data.map(i => capitalizeFirstLetterStringInObject(i)));
  },
  getTeacherById: async id =>
    await axios
      .get(`${BASE_URL}/teacher/${id}`)
      .then(response => capitalizeFirstLetterStringInObject(response.data)),
  addTeacher: async payload =>
    await axios.post(`${BASE_URL}/teacher`, lowerCaseStringInObject(payload)),
  updateTeacher: async (id, payload) =>
    await axios.put(`${BASE_URL}/teacher/${id}`, lowerCaseStringInObject(payload)),
  deleteTeacher: async id => await axios.post(`${BASE_URL}/teacher/${id}`)
};

export {
  fetchAPI,
  exportToXLSX,
  capitalizeFirstLetter,
  lowerCaseStringInObject,
  capitalizeFirstLetterStringInObject,
  reqTeacher
};
