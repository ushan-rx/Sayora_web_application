import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewDoctorTime = () => {
  const [availability, setAvailability] = useState([]);
  const [filteredAvailability, setFilteredAvailability] = useState([]);
  const [doctors, setDoctors] = useState({});
  const [searchDoctorID, setSearchDoctorID] = useState("");
  const [searchTime, setSearchTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/doctortime/getAll"
        );
        setAvailability(data);
        setFilteredAvailability(data);

        const uniqueDoctorIds = [...new Set(data.map((slot) => slot.doctorID))];
        const doctorDetails = await Promise.all(
          uniqueDoctorIds.map((id) =>
            axios
              .get(`http://localhost:5000/api/v1/doctor/${id}`)
              .then((response) => ({ id, details: response.data }))
          )
        );

        setDoctors(
          doctorDetails.reduce(
            (acc, { id, details }) => ({ ...acc, [id]: details }),
            {}
          )
        );
      } catch (error) {
        console.error("Error fetching doctor availability:", error);
      }
    };

    fetchAvailability();
  }, []);

  useEffect(() => {
    const filteredResults = availability.filter((slot) => {
      const doctorIdMatch = slot.doctorID.toLowerCase().includes(searchDoctorID.toLowerCase());
      const timeMatch = slot.time.toLowerCase().includes(searchTime.toLowerCase());

      return doctorIdMatch && timeMatch;
    });

    setFilteredAvailability(filteredResults);
  }, [availability, searchDoctorID, searchTime]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/doctortime/delete/${id}`);
      setAvailability(availability.filter((slot) => slot._id !== id));
      setFilteredAvailability(filteredAvailability.filter((slot) => slot._id !== id));
      alert('Available Time Deleted..')
    } catch (error) {
      console.error("Error deleting availability time:", error);
    }
  };

  const handleUpdate = (id) => {
    navigate('/staff/appointment/time/update' , { state: id })
  };

  const handleSearch = async () => {
    const filteredResults = availability.filter((slot) => {
      const doctorIdMatch = slot.doctorID.toLowerCase().includes(searchDoctorID.toLowerCase());
      const timeMatch = slot.time.toLowerCase().includes(searchTime.toLowerCase());

      return doctorIdMatch && timeMatch;
    });

    setFilteredAvailability(filteredResults);
  };

  return (
    <div className="flex justify-center mt-8 h-[80vh] overflow-auto scrollbar-thin">
      <div className="max-w-4xl w-full">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-4 l">
            <input
              type="text"
              placeholder="Enter Doctor ID"
              value={searchDoctorID}
              onChange={(e) => setSearchDoctorID(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"style={{ outline: "2px solid #a0d8ff" }}
            />
          
          </div>
          <div>
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Search
            </button>
          </div>
        </div>
        <div className="overflow-x-auto shadow-lg ">
          <table className="w-full text-sm text-left text-black table-fixed">
            <thead className="text-xs text-white bg-blue-900">
              <tr>
                <th scope="col" className="py-2 px-2 w-1/4 border-black">
                  Doctor ID
                </th>
                <th scope="col" className="py-2 px-2 w-1/4 border-black">
                  Date
                </th>
                <th scope="col" className="py-2 px-2 w-1/4 border-black">
                  Time
                </th>
                <th scope="col" className="py-2 px-2 w-1/4 border-black">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredAvailability.map((slot) => (
                <tr
                  key={slot._id}
                  className=" border px-4 py-2hover:bg-gray-100"
                >
                  <td className="py-2 px-2 ">
                    {slot.doctorID}
                  </td>
                  <td className="py-2 px-2 border-black">
                    {new Date(slot.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2 ">{slot.time}</td>
                  <td className="py-2 px-2 border-black">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdate(slot._id)}
                        className="text-white bg-blue-500 px-4 py-1 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(slot._id)}
                        className="text-white bg-red-500 px-4 py-1 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredAvailability.length === 0 && (
          <p className="text-center text-blue-800">
            No availability times to display.
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewDoctorTime;
