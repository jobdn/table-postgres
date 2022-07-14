import React from "react";

import axios from "axios";

import { TablePagination } from "./components/Pagination";
import { Table } from "./components/Table";
import { fetchProductsThunk } from "./redux/reducers/products/fetch-products";
import { useAppDispatch, useTypedSelector } from "./hooks/redux";
import { selectProducts } from "./redux/reducers/products/selectors";
import { Filter } from "./components/Filter";

interface ITableItem {
  id: number;
  date: Date;
  name: string;
  amount: number;
  length: number;
}

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { page } = useTypedSelector(selectProducts);

  React.useEffect(() => {
    dispatch(fetchProductsThunk(page));
  }, []);

  //===============================================================

  const [date, setDate] = React.useState("");
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [distance, setDistance] = React.useState(0);

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    switch (event.target.name) {
      case "date":
        const date = new Date(event.target.value);
        const stringDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

        setDate(stringDate);
        break;
      case "name":
        setName(event.target.value);
        break;
      case "amount":
        setAmount(+event.target.value);
        break;
      case "distance":
        setDistance(+event.target.value);
        break;
      default:
        return;
    }
  };

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    const res = await axios.post("api/create-product", {
      date,
      name,
      amount,
      distance,
    });

    setName("");
    setAmount(0);
    setDistance(0);
  };

  const getAllProducts = async () => {
    const allProducts = await axios.get<ITableItem[]>("/api/products");
  };

  // =============================================================

  return (
    <div>
      <form>
        <div className="form__control">
          <label htmlFor="date">Date: </label>
          <input
            name="date"
            type="date"
            onChange={onInputChange}
            value={date.toString()}
          />
        </div>
        <div className="form__control">
          <label htmlFor="name">Name: </label>
          <input
            name="name"
            type="text"
            onChange={onInputChange}
            value={name}
          />
        </div>
        <div className="form__control">
          <label htmlFor="amount">Amount: </label>
          <input
            name="amount"
            type="range"
            onChange={onInputChange}
            value={amount}
          />
        </div>
        <div className="form__control">
          <label htmlFor="distance">Distance: </label>
          <input
            name="distance"
            type="range"
            onChange={onInputChange}
            value={distance}
          />
        </div>
        <div className="form__control">
          <button onClick={onSubmit}>Add Products</button>
        </div>
      </form>

      <button onClick={getAllProducts}>Get all products</button>
      <Filter />
      <Table />
      <TablePagination />
    </div>
  );
};

export default App;
