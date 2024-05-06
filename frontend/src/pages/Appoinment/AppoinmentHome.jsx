import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppoinmentHome = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [doctorTimeList, setDoctorTimeList] = useState([]);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorsAndTimes = async () => {
      try {
        const doctorsResponse = await axios.get(
          "http://localhost:5000/api/v1/doctor"
        );
        const timesResponse = await axios.get(
          "http://localhost:5000/doctorTime/getAll"
        );
        setDoctors(doctorsResponse.data.doctors);
        setDoctorTimeList(timesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDoctorsAndTimes();
  }, []);

  useEffect(() => {
    let filteredResults = doctors;

    if (search) {
      filteredResults = filteredResults.filter(
        (doctor) =>
          `${doctor.fName} ${doctor.lName}`
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    setResults(filteredResults);
  }, [doctors, search]);

  const handleSearch = () => {
    // Perform search logic here
    console.log("Searching...");
    // Call setResults with the filtered doctors based on the search query
    setResults(doctors.filter((doctor) =>
      `${doctor.fName} ${doctor.lName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    ));
  };

  const handleNavigate = (doctor, App_date, App_time) => {
    const doctorID = doctor.doctorId;
    navigate(`/appointment/add`, {
      state: { doctorID, App_date, App_time },
    });
  };

  return (
    <div className="flex flex-col items-center mx-auto mt-36">
      <div className="flex flex-col items-start">
        <div className="flex flex-row items-center">
          <input
            type="text"
            placeholder="Enter the doctor name"
            className="border p-2 m-2 w-80 h-10 bg-891652 text-gray rounded-md  border-gray-500"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-400 text-white w-40 m-2 py-2 px-5 rounded-md "
          >
            Search
          </button>
        </div>
      </div>
      <div className="">
        {results.length > 0 ? (
          results.map((doctor) => {
            const doctorTimes = doctorTimeList.filter(
              (time) => time.doctorID === doctor.doctorId
            );
            return (
              <div key={doctor.doctorId} className="flex flex-col items-center border border-gray-300 rounded-md p-4 my-4 mx-2">
                <div className="m-5">
                  <h3 className="text-lg font-bold">
                    {doctor.fName} {doctor.lName} -{" "}
                    {doctor.specialization.map((spec) => spec.name).join(", ")}
                  </h3>
                  {doctorTimes.length > 0 ? (
                    doctorTimes.map((time) => (
                      <div key={`${doctor.doctorId}-${time.date}-${time.time}`} className="w-full flex justify-between items-center">
                        <div className="flex">
                          <div className="bg-orange-600 text-white rounded-md p-2 mr-2 w-40 mb-1">
                            <span>{new Date(time.date).toLocaleDateString()} - {time.time}</span>
                          </div>
                        </div>
                        <button
                          className="bg-blue-500 text-white py-2 px-5 rounded-md ml-10"
                          onClick={() => handleNavigate(doctor, time.date, time.time)}
                        >
                          Book Appointment
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center border border-gray-300 rounded-md p-4 m-4">
                      <div> No Allocated Time</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div>No doctors found</div>
        )}
      </div>
    </div>
  );
};

export default AppoinmentHome;