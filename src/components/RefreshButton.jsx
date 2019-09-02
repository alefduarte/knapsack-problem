import React, { useContext, useState } from "react";
import { Button, Tooltip, InputNumber } from "antd";
import { TableContext } from "../context/TableContext";
import * as Types from "../context/Types";

const RefreshButton = () => {
  const { dispatch } = useContext(TableContext);
  const [size, setSize] = useState(10);

  const changeSize = e => setSize(e);

  const refreshItems = () => {
    dispatch({
      type: Types.REFRESH_ITEMS,
      payload: {
        amount: size
      }
    });
    dispatch({ type: Types.PACK_ITEMS });
  };

  return (
    <div className="refresh-items">
      <Tooltip title="Quantidade de Itens">
        <InputNumber value={size} onChange={changeSize} style={{ width: 60 }} />
      </Tooltip>
      <Tooltip title="Redefine os Itens da tabela">
        <Button onClick={refreshItems}>Atualizar Itens</Button>
      </Tooltip>
    </div>
  );
};

export default RefreshButton;
