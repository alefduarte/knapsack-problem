import React from "react";
import { Layout } from "antd";
import InputTable from "./components/InputTable";
import MochilaTable from "./components/MochilaTable";
import TamanhoMochila from "./components/TamanhoMochila";
import RefreshButton from "./components/RefreshButton";

import "./App.css";
import "antd/dist/antd.min.css";

const { Content } = Layout;

function App() {
  return (
    <Layout className="App">
      <header className="App-header">
        <p>Problema da Mochila</p>
      </header>
      <TamanhoMochila />
      <RefreshButton />
      <Content className="page-content">
        <MochilaTable />
        <InputTable />
      </Content>
    </Layout>
  );
}

export default App;
