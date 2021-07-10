const axios = require("axios");

export const instance = axios.create({
  baseURL: "https://instantchat-server.herokuapp.com",
  // baseURL: "http://localhost:9000",
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
