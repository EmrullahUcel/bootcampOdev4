import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCustomer, setLoading } from "../slice/DataSlice";
import axios from "axios";

const Content = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dataBox.data);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const [sortAscending, setSortAscending] = useState(true);
  const [pageLength, setPageLength] = useState(data.length);
  const [sortedData, setSortedData] = useState([]);

  const filteredData = useCallback(() => {
    return sortedData.slice(0, pageLength);
  }, [pageLength, sortedData]);

  const handleOption = (e) => {
    const num = e.target.value;
    const newNum = parseFloat(num);
    setPageLength(newNum);
  };

  const fetchData = () => async (dispatch) => {
    try {
      dispatch(setLoading());
      const response = await axios.get(
        "https://northwind.vercel.app/api/customers"
      );
      setPageLength(response.data.length);
      setSortedData(response.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleChange = () => {
    const newSortedData = [...sortedData];
    newSortedData.sort((a, b) => {
      const companyA = a.companyName.toLowerCase();
      const companyB = b.companyName.toLowerCase();
      return sortAscending
        ? companyA.localeCompare(companyB)
        : companyB.localeCompare(companyA);
    });

    setSortAscending(!sortAscending);
    setSortedData(newSortedData);
  };

  return (
    <div className="flex relative">
      <select
        onChange={handleOption}
        className="absolute right-0"
        name="itemCount"
        id="itemCount"
      >
        <option value={sortedData.length}>All</option>
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
              onClick={handleChange}
              className="border-collapse border-2 cursor-pointer"
            >
              Company Name
            </th>
            <th className="border-collapse border-2">Street</th>
            <th className="border-collapse border-2">City</th>
          </tr>
        </thead>
        <tbody className="border-collapse border-2">
          {filteredData()?.map((d, i) => (
            <tr className="border-collapse border-2" key={d.id}>
              <td className="border-collapse border-2">{i + 1}</td>
              <td className="border-collapse border-2">{d.id}</td>
              <td className="border-collapse border-2">{d.companyName}</td>
              <td className="border-collapse border-2">{d.address?.street}</td>
              <td className="border-collapse border-2">{d.address?.city}</td>
              <td>
                <button onClick={() => dispatch(deleteCustomer(d))}>
                  delete customer
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
