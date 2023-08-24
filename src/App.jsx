import "./App.css";
import { useState } from "react";
import Content from "./components/Content";
import AddCustomer from "./components/addCustomer";

function App() {
  const [data, setData] = useState([]);

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="w-full h-screen flex flex-col items-center ">
      <button className="bg-red-600 text-white w-32" onClick={openModal}>
        Add Customer Menu
      </button>
      <AddCustomer
        openModal={openModal}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        setData={setData}
        data={data}
      />
      <Content data={data} setData={setData} />
    </div>
  );
}

export default App;
