import React, { useState } from "react";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { addCustomer } from "../slice/DataSlice";
import { useSelector } from "react-redux";

const customStyles = {
  content: {
    display: "flex",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    justifyContent: "center",
    alignItems: "center",
    width: "396",
    height: "386px",
  },
};

Modal.setAppElement("#root");

const AddCustomer = ({ closeModal, modalIsOpen }) => {
  const data = useSelector((state) => state.dataBox.data);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const handleAdd = () => {
    const existingCustomer = data.find((cus) => cus.id === id);

    if (existingCustomer) {
      alert("Aynı id daha önce eklendi");
      return;
    }
    const newCustomer = {
      id,
      companyName: name,
      address: {
        street,
        city,
      },
    };
    dispatch(addCustomer(newCustomer));
    setCity("");
    setId("");
    setName("");
    setStreet("");
  };

  const isAddButtonDisabled = !id || !name || !street || !city;

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        className="relative  flex flex-col bg-white border-solid border-2 border-gray-500 "
      >
        <GrClose
          onClick={closeModal}
          className="absolute top-0 right-0 mt-10 mr-5 cursor-pointer text-2xl"
        />
        <h1>Add Customer</h1>
        <div className="flex w-96 h-96 flex-col border-solid border-2 border-blue-700 justify-center items-center text-center">
          <label>ID</label>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="border-solid border-2 border-red-800"
            type="text"
          />
          <label>Company Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-solid border-2 border-red-800"
            type="text"
          />
          <label>Street</label>
          <input
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="border-solid border-2 border-red-800"
            type="text"
          />
          <label>City</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border-solid border-2 border-red-800"
            type="text"
          />
          <button
            disabled={isAddButtonDisabled}
            className={`w-24 h-16 border-2 bg-blue-700 text-white rounded-lg ${
              isAddButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => {
              handleAdd();
            }}
          >
            Add
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddCustomer;
