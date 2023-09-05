// DataContext.js
import React, { createContext, useContext, useReducer } from "react";

const DataStateContext = createContext();
const DataDispatchContext = createContext();

const initialState = {
  pageSize: 5,
  searchText: "",
  filters: {},
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.payload };
    case "SET_SEARCH_TEXT":
      return { ...state, searchText: action.payload };
    case "SET_FILTER":
      return { ...state, filters: action.payload };
    default:
      return state;
  }
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataStateContext.Provider value={state}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataStateContext.Provider>
  );
};

const useDataState = () => {
  const context = useContext(DataStateContext);
  if (context === undefined) {
    throw new Error("useDataState must be used within a DataProvider");
  }
  return context;
};

const useDataDispatch = () => {
  const context = useContext(DataDispatchContext);
  if (context === undefined) {
    throw new Error("useDataDispatch must be used within a DataProvider");
  }
  return context;
};

export { DataProvider, useDataState, useDataDispatch };
