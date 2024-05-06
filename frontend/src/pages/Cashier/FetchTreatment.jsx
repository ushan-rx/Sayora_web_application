
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Table } from "antd";
import { useTreatmentStore } from "@/store/useTreatmentStore";
import { confirmMessage, successMessage } from "@/utils/Alert";

const { Column } = Table;

const FetchTreatment = () => {
  const { setSelectedTreatment } = useTreatmentStore((state) => ({
    setSelectedTreatment: state.setSelectedTreatment,
  }));

  const [treatments, setTreatments] = useState(null);

  useEffect(() => {
    const showTre = async () => {
      try {
        const response = await axios.get("http://localhost:5000/treatment/");
        if (response.status === 200) {
          setTreatments(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    showTre();
  }, []);

  const deleteTreatment = async (treatmentId) => {
    confirmMessage(
      "Are you sure?",
      "You won't be able to revert this!",
      async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/treatment/delete/${treatmentId}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          setTreatments(
            treatments.filter((item) => item.treatmentId !== treatmentId)
          );

          successMessage("Success", "Treatment Removed");
        } catch (error) {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        }
      }
    );
  };

  return (
    <div className="container mx-auto">
      <h1 className="mt-8 mb-4 text-3xl px-28">All Treatments</h1>
      {/* <Link to={`/addTreat`} className="inline-block px-4 py-2 mb-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Add New</Link> */}
      <div className="mt-8 overflow-y-auto h-96">
        <div className="w-4/5 mx-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0">
              <tr>
                <th className="px-4 py-2 bg-blue-100 border">Treatment ID</th>
                <th className="px-4 py-2 bg-blue-100 border">Name</th>
                <th className="px-4 py-2 bg-blue-100 border">Description</th>
                <th className="px-4 py-2 bg-blue-100 border">Price</th>
                <th className="px-4 py-2 bg-blue-100 border">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {treatments &&
                treatments.map((record) => (
                  <tr key={record.treatmentId}>
                    <td className="px-4 py-2 border">{record.treatmentId}</td>
                    <td className="px-4 py-2 border">{record.name}</td>
                    <td className="px-4 py-2 border">{record.description}</td>
                    <td className="px-4 py-2 border">{record.price}</td>
                    <td className="px-4 py-2 border">
                      <Link
                        to={`/staff/updatex/${record.treatmentId}`}
                        className="inline-block px-2 py-1 mb-2 mr-2 font-bold text-white bg-yellow-500 rounded hover:bg-yellow-700"
                        onClick={() => setSelectedTreatment(record)}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteTreatment(record.treatmentId)}
                        className="inline-block px-2 py-1 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FetchTreatment;
