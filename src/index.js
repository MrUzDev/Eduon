import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./assets/css/Grid.css";

// import cors from "cors";

// const cors = require("cors");
// const app = require('express')
// app.options("*", cors({ origin: 'http://localhost:8000', optionsSuccessStatus: 200 }));

// app.use(cors({ origin: "http://localhost:8000", optionsSuccessStatus: 200 }))

const container = document.getElementById("root");

const root = ReactDOM.createRoot(container);

root.render(<App tab="Eduon" />);