import React, { createContext, useReducer } from "react";
import items from "../json/items.json";
import * as Types from "./Types";
import uuid from "uuid";

const TableContext = createContext();

const getBenefitWeight = items => {
  return items.map(item => ({
    ...item,
    benefitWeight: item.benefit / item.weight
  }));
};

const renderList = items => {
  return getBenefitWeight(
    items.map(item => ({
      key: uuid.v4(),
      name: item.name,
      weight: Math.round(Math.random() * 200) / 100,
      benefit: Math.floor(Math.random() * 10)
    }))
  );
};

const getItems = (items, amount) =>
  items.sort(() => 0.5 - Math.random()).slice(0, amount);

const packItems = (items, size) => {
  let total = 0;
  const s = [];
  const orderedItems = items.sort((a, b) => a.benefitWeight - b.benefitWeight);
  orderedItems.reverse();

  for (let i = 0; i < orderedItems.length; i++) {
    if (total + orderedItems[i].weight <= size) {
      s.push(orderedItems[i]);
      total += orderedItems[i].weight;
    } else {
      return s;
    }
  }
  return s;
};

const initialState = {
  fullItems: renderList(items),
  items: [],
  size: 2,
  backpack: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case Types.RESET_ITEM:
      return initialState;
    case Types.ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] };
    case Types.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.key !== action.key)
      };
    case Types.PACK_ITEMS:
      return { ...state, backpack: packItems(state.items, state.size) };
    case Types.CHANGE_SIZE:
      return { ...state, size: action.payload.size };
    case Types.REFRESH_ITEMS:
      return {
        ...state,
        items: getItems(state.fullItems, action.payload.amount)
      };
    default:
      return state;
  }
};

function TableContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
}

const TableContextConsumer = TableContext.Consumer;

export { TableContext, TableContextProvider, TableContextConsumer };
