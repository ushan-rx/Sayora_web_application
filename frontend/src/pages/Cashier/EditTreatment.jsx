import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useTreatmentStore } from "@/store/useTreatmentStore";

export default function EditTreatment() {
  const navigate = useNavigate();
  //
  const { selectedTreatment } = useTreatmentStore((state) => ({
    selectedTreatment: state.selectedTreatment,
  }));
  //
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const params = useParams();
  const treatmentId = params.id;

  useEffect(() => {
    setName(selectedTreatment?.name);
    setDescription(selectedTreatment?.description);
    setPrice(selectedTreatment?.price);
  }, [selectedTreatment]);

  function handleSubmit(e) {
    e.preventDefault();
    const updatedTreatment = {
      name,
      description,
      price,
    };
    axios
      .put(
        `http://localhost:5000/treatment/update/${treatmentId}`,
        updatedTreatment
      )
      .then(() => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Treatment Updated",
          showConfirmButton: true,
          timer: 1500,
        });
        navigate("/staff/Treatment/viewTreat");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="mb-4 text-2xl font-bold">Update Treatment</h1>
      {selectedTreatment ? (
        <form
          onSubmit={handleSubmit}
          className="max-w-lg p-4 mx-auto space-y-4 border border-gray-300 rounded"
        >
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
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 mr-1 font-bold text-white bg-[#0B66C1] rounded-lg hover:bg-blue-700"
            >
              Update
            </button>
            <Link
              to="/staff/Treatment/viewTreat"
              className="px-4 py-2 font-bold text-white bg-red-500 rounded-lg hover:bg-red-700"
            >
              Cancel
            </Link>
          </div>
        </form>
      ) : (
        <div className="text-lg text-gray-500">Loading...</div>
      )}
    </div>
  );
}
