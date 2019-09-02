import React, { useContext } from "react";
import { InputNumber, Tooltip } from "antd";
import { TableContext } from "../context/TableContext";
import * as Types from "../context/Types";

const TamanhoMochila = () => {
  const { state, dispatch } = useContext(TableContext);

  const updateSize = e => {
    dispatch({
      type: Types.CHANGE_SIZE,
      payload: {
        size: parseFloat(e || 0)
      }
    });
    dispatch({ type: Types.PACK_ITEMS });
  };

  return (
    <div className="tamanho-mochila">
      <p>Tamanho da Mochila</p>
      <Tooltip title="Tamanho MÃ¡ximo da Mochila em Kg">
        <InputNumber value={state.size} onChange={updateSize} />
      </Tooltip>
    </div>
  );
};

export default TamanhoMochila;
