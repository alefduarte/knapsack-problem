import React, { useContext, useEffect } from "react";
import { Table, Button, Tooltip, Typography } from "antd";
import { TableContext } from "../context/TableContext";
import * as Types from "../context/Types";

const { Text } = Typography;

const MochilaTable = () => {
  const { state, dispatch } = useContext(TableContext);

  const removeItem = record => {
    dispatch({
      type: Types.REMOVE_ITEM,
      key: record.key
    });
    dispatch({ type: Types.PACK_ITEMS });
  };

  useEffect(() => {
    dispatch({
      type: Types.REFRESH_ITEMS,
      payload: {
        amount: 10
      }
    });
    dispatch({ type: Types.PACK_ITEMS });
  }, [dispatch]);

  const columns = [
    {
      title: "Nome do Item",
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (_, record) =>
        !!state.backpack.find(item => item.key === record.key) ? (
          <Text className="backpack-text" strong>
            {record.name}
          </Text>
        ) : (
          <span>{record.name}</span>
        )
    },
    {
      title: "Peso",
      dataIndex: "weight",
      key: "weight",
      width: 200,
      render: (_, record) =>
        !!state.backpack.find(item => item.key === record.key) ? (
          <Text className="backpack-text" strong>
            {record.weight}
          </Text>
        ) : (
          <span>{record.weight}</span>
        )
    },
    {
      title: "Benefício",
      dataIndex: "benefit",
      key: "benefit",
      width: 200,
      render: (_, record) =>
        !!state.backpack.find(item => item.key === record.key) ? (
          <span>
            <Text className="backpack-text" strong>
              {record.benefit}
            </Text>
          </span>
        ) : (
          <span>{record.benefit}</span>
        )
    },
    {
      title: "Benefício/Peso",
      dataIndex: "benefitWeight",
      key: "benefitWeight",
      width: 200,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.benefitWeight - b.benefitWeight,
      render: (_, record) =>
        !!state.backpack.find(item => item.key === record.key) ? (
          <span>
            <Text className="backpack-text" strong>
              {record.benefitWeight.toFixed(2)}
            </Text>
          </span>
        ) : (
          <span>{record.benefitWeight.toFixed(2)}</span>
        )
    },
    {
      title: "Ação",
      key: "action",
      width: 20,
      render: (_, record) => (
        <Tooltip title="Apagar Item" placement="left">
          <Button
            onClick={() => removeItem(record)}
            className="no-padding red-color"
            id={record.key}
            type="link"
            icon="delete"
            style={{
              display: state.items.length === 1 ? "none" : ""
            }}
          />
        </Tooltip>
      )
    }
  ];

  return (
    <Table
      className="mochila-table"
      columns={columns}
      scroll={{ x: "100vh" }}
      dataSource={state.items}
      size="middle"
      pagination={false}
    />
  );
};

export default MochilaTable;
