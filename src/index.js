import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TableContextProvider } from "./context/TableContext";

ReactDOM.render(
  <TableContextProvider>
    <App />
  </TableContextProvider>,
  document.getElementById("root")
);
