import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCustomer,
  sortData,
  setLoading,
  setData,
} from "../slice/DataSlice";
import axios from "axios";

const Content = () => {
  const data = useSelector((state) => state.dataBox.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const [isAscending, setIsAscending] = useState(true);
  const [selectedItemCount, setSelectedItemCount] = useState(data.length);
  const [displayedData, setDisplayedData] = useState([]);
  const fetchData = () => async (dispatch) => {
    try {
      dispatch(setLoading());
      const response = await axios.get(
        "https://northwind.vercel.app/api/customers"
      );
      dispatch(setData(response.data));
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    let splicedData = [];
    switch (selectedItemCount) {
      case "0":
        setDisplayedData(data);
        break;
      case "5":
        splicedData = data.slice(0, 5);
        setDisplayedData(splicedData);
        break;
      case "10":
        splicedData = data.slice(0, 10);
        setDisplayedData(splicedData);
        break;
      case "15":
        splicedData = data.slice(0, 15);
        setDisplayedData(splicedData);
        break;
      case "20":
        splicedData = data.slice(0, 20);
        setDisplayedData(splicedData);
        break;
      default:
        setDisplayedData(data);
        break;
    }
  }, [data, selectedItemCount]);

  const handleSort = (field) => {
    dispatch(sortData({ field, ascending: isAscending }));
    setIsAscending(!isAscending);
  };

  const handleOption = (e) => {
    const num = e.target.value;
    setSelectedItemCount(num);
  };
  return (
    <div className="flex relative">
      <select
        onChange={handleOption}
        className="absolute right-0"
        name="itemCount"
        id="itemCount"
      >
        <option value={0}>All</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <table className="border-collapse border-2">
        <thead className="border-collapse border-2">
          <tr className="border-collapse border-2">
            <th className="border-collapse border-2"></th>
            <th className="border-collapse border-2">ID</th>
            <th
              onClick={() => handleSort("companyName")}
              className="border-collapse border-2 cursor-pointer"
            >
              Company Name
            </th>
            <th
              onClick={() => handleSort("")}
              className="border-collapse border-2"
            >
              Street
            </th>
            <th className="border-collapse border-2">City</th>
          </tr>
        </thead>
        <tbody className="border-collapse border-2">
          {displayedData?.map((d, i) => (
            <tr className="border-collapse border-2" key={d.id}>
              <td className="border-collapse border-2">{i + 1}</td>
              <td className="border-collapse border-2">{d.id}</td>
              <td className="border-collapse border-2">{d.companyName}</td>
              <td className="border-collapse border-2">{d.address?.street}</td>
              <td className="border-collapse border-2">{d.address?.city}</td>
              <td>
                <button onClick={() => dispatch(deleteCustomer(d))}>
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Content;
