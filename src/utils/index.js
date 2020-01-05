import axios from "axios";
import exportToXLSX from "./export";

// STRING SANITATION

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

// CLIENT API SERVICE

const BASE_URL = "https://app-13a41883-30f6-425f-b5f7-7264fc31a1e7.cleverapps.io";

const fetchAPI = async endpoint => await axios.get(`${BASE_URL}/${endpoint}`); // generic fetch api

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

const reqCLC = {
  // TODO: make all format fix, return response status or nagh ? but i have to handle strings
  getAllCLCs: async filter => {
    let endpoint = `${BASE_URL}/clcs`;
    if (filter) endpoint += `?search=${filter}`;
    console.log("getAllCLCs", endpoint);
    return await axios
      .get(endpoint)
      .then(response => response.data.map(i => capitalizeFirstLetterStringInObject(i)));
  },
  getCLCById: async id =>
    await axios
      .get(`${BASE_URL}/clc/${id}`)
      .then(response => capitalizeFirstLetterStringInObject(response.data)),
  addCLC: async payload =>
    await axios.post(`${BASE_URL}/clc`, lowerCaseStringInObject(payload)),
  updateCLC: async (id, payload) =>
    await axios.put(`${BASE_URL}/clc/${id}`, lowerCaseStringInObject(payload)),
  deleteCLC: async id => await axios.post(`${BASE_URL}/clc/${id}`)
};

const reqAssembly = {
  // TODO: make all format fix, return response status or nagh ? but i have to handle strings
  getAllAssemblys: async filter => {
    let endpoint = `${BASE_URL}/clcs`;
    if (filter) endpoint += `?search=${filter}`;
    console.log("getAllAssemblys", endpoint);
    return await axios
      .get(endpoint)
      .then(response => response.data.map(i => capitalizeFirstLetterStringInObject(i)));
  },
  getAssemblyById: async id =>
    await axios
      .get(`${BASE_URL}/clc/${id}`)
      .then(response => capitalizeFirstLetterStringInObject(response.data)),
  addAssembly: async payload =>
    await axios.post(`${BASE_URL}/clc`, lowerCaseStringInObject(payload)),
  updateAssembly: async (id, payload) =>
    await axios.put(`${BASE_URL}/clc/${id}`, lowerCaseStringInObject(payload)),
  deleteAssembly: async id => await axios.post(`${BASE_URL}/clc/${id}`)
};

const authentication = {
  setUsername: (cvalue, remember) => {
    const exdays = remember ? 365 : 1;
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = "username=" + cvalue + ";" + expires + ";path=/";
  },
  getUsername: () => {
    var name = "username=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
  checkLoggedInUser: function() {
    var user = this.getUsername();
    if (user !== "") {
      return {
        isLogin: true,
        username: user
      };
    } else {
      return {
        isLogin: false,
        username: null
      };
    }
  }
};

export {
  BASE_URL,
  fetchAPI,
  exportToXLSX,
  capitalizeFirstLetter,
  lowerCaseStringInObject,
  capitalizeFirstLetterStringInObject,
  reqTeacher,
  reqCLC,
  reqAssembly,
  authentication
};
