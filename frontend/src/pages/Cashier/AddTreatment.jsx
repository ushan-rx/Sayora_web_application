import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { handleUpload } from "../../utils/HandleUpload";
import { errorMessage } from "@/utils/Alert";

const AddTreatment = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});

  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  const validateForm = () => {
    let errors = {};

    if (!name.trim()) {
      // Name validate
      errors.name = "Treatment Name is required";
    }
    if (!price.trim()) {
      // Price Validate
      errors.price = "Price is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(price.trim())) {
      errors.price = "Price must be a valid number";
    } else if (parseFloat(price) <= 0) {
      errors.price = "Price must be a positive number";
    }

    if (!description.trim()) {
      // Description Validate
      errors.description = "Description is required";
    } else if (description.length < 20 || description.length > 500) {
      errors.description = "Description must be between 20 and 500 characters";
    }

    if (!file) {
      errors.file = "Image is required";
    }

    if (!image) {
      errors.image = "Image is required";
      errorMessage("Error", "Please upload an image");
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const clearFields = () => {
    setName("");
    setPrice("");
    setDescription("");
    setImage("");
    setFile("");
    setPercent(0);
    setErrors({});
  };

  const sendData = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newTreatment = {
        name,
        description,
        price: parseFloat(price).toFixed(2), //convert to two decimal
        image,
      };

      axios
        .post("http://localhost:5000/treatment/add", newTreatment)
        .then(() => {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Treatment Added",
            showConfirmButton: true,
            timer: 1500,
          });
          clearFields();
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    // const file = e.target.files[0];
    setFile(file);
    handleUpload({ file, setPercent, setImage });
  };

  // Handle change
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="w-full max-w-md p-6 mt-1 mb-8 bg-white border shadow-xl rounded-xl">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">
          Add New Treatment
        </h1>
        <form onSubmit={sendData} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.file && (
              <p className="text-sm text-red-500">{errors.file}</p>
            )}
            {percent > 0 && (
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-gray-600">Uploading Image...</p>
                <p className="text-sm text-gray-600">{percent}%</p>
              </div>
            )}
            <button
              type="button"
              onClick={handleImageUpload}
              className="px-2 py-1 mt-2 font-bold text-white bg-gray-400 rounded-lg hover:bg-gray-700"
            >
              Upload
            </button>
          </div>

          <div className="flex">
            <button
              type="submit"
              className="px-4 py-2 mr-1 font-bold text-white bg-[#0B66C1] rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              type="button"
              className="px-4 py-2 ml-1 font-bold text-white bg-[#D7263D] rounded-lg hover:bg-red-700"
              onClick={clearFields}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTreatment;
