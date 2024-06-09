import React, { useState } from "react";
import { instance } from "../axios";

const AddProductModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [allergens, setAllergens] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance.post("/products", {
        name,
        description,
        allergens,
      });
      onClose();
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-md font-poppins">
        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="description"
            >
              Product Description
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border rounded italic"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="allergens">
              Product Allergen Info
            </label>
            <textarea
              id="allergens"
              className="w-full px-3 py-2 border rounded"
              value={allergens}
              onChange={(e) => setAllergens(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:scale-105 duration-300"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
