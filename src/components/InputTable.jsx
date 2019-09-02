import React, { useContext, useState } from "react";
import { Form, Input, InputNumber, Button, Tooltip } from "antd";
import { TableContext } from "../context/TableContext";
import * as Types from "../context/Types";

const InputTableForm = ({ form }) => {
  const [benefitWeight, setBenefitWeight] = useState(0);
  const { dispatch } = useContext(TableContext);
  const { getFieldDecorator, validateFields, resetFields } = form;

  const handleSubmit = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: Types.ADD_ITEM,
          payload: {
            key: values.name,
            name: values.name,
            weight: parseFloat(values.weight || 0),
            benefit: parseFloat(values.benefit || 0),
            benefitWeight:
              parseFloat(values.benefit || 0) / parseFloat(values.weight || 0)
          }
        });
        dispatch({ type: Types.PACK_ITEMS });
        resetFields();
        setBenefitWeight(0);
      }
    });
  };

  const updateWeight = e => {
    const { benefit } = form.getFieldsValue();
    setBenefitWeight(parseFloat(benefit || 0) / parseFloat(e || 0));
  };

  const updateBenefit = e => {
    const { weight } = form.getFieldsValue();
    setBenefitWeight(parseFloat(e || 0) / parseFloat(weight || 0));
  };

  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator("name", {
          rules: [{ required: true, message: "Insira um nome para o item!" }]
        })(<Input allowClear placeholder="Nome do Item" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("weight", {
          rules: [{ required: true, message: "Insira o peso do item!" }]
        })(<InputNumber placeholder="Peso (kg)" onChange={updateWeight} />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("benefit", {
          rules: [{ required: true, message: "Insira o benefício do item!" }]
        })(<InputNumber placeholder="Benefício" onChange={updateBenefit} />)}
      </Form.Item>
      <Form.Item>
        <Tooltip title="Peso/Benefício">
          {getFieldDecorator("weightBenefit", {
            initialValue: benefitWeight
          })(<InputNumber disabled placeholder="Peso/Benefício" />)}
        </Tooltip>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Adicionar
        </Button>
      </Form.Item>
    </Form>
  );
};

const InputTable = Form.create({ name: "machila-form" })(InputTableForm);

export default InputTable;
