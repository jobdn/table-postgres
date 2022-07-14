import React from "react";

import { fetchProductsThunk } from "./redux/reducers/products/fetch-products";
import { useAppDispatch, useTypedSelector } from "./hooks/redux";
import { selectProducts } from "./redux/reducers/products/selectors";

import { TablePagination } from "./components/TablePagination";
import { Table } from "./components/Table";
import { Filter } from "./components/Filter";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { page } = useTypedSelector(selectProducts);

  React.useEffect(() => {
    dispatch(fetchProductsThunk(page));
  }, []);

  return (
    <div className="App">
      <Filter />
      <Table />
      <TablePagination />
    </div>
  );
};

export default App;
