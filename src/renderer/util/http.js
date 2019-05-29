const axios = require("axios");

//const url = window.location.host.split(":")[0];

const urlDevelopment = "http://localhost:3333";
const urlProduction = "http://10.0.10.95:7070";

window.URL_API = process.env.NODE_ENV === 'development' ? urlDevelopment : urlProduction

const client = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? urlDevelopment : urlProduction
});

export default client;
