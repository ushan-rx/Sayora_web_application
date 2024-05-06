import axios from "axios";
import React, { useEffect, useState } from "react";
import WebsiteNavbar from "@/components/website/WebsiteNavbar";
import { Link } from "react-router-dom";

const TreatmentCard = ({ treatment }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="object-cover w-full h-48 mt-3 ml-3 rounded-lg md:w-48"
            src={treatment.image}
            alt={treatment.name}
          />
        </div>
        <div className="p-8">
          <a
            href="#"
            className="block mt-1 text-lg font-medium leading-tight text-black hover:underline"
          >
            {treatment.name}
          </a>
          <p className="mt-2 text-gray-500">
            {showFullDescription
              ? treatment.description
              : `${treatment.description.substring(0, 100)}...`}
            {!showFullDescription && (
              <button
                className="text-blue-500 hover:underline"
                onClick={toggleDescription}
              >
                See More
              </button>
            )}
          </p>
          <div className="mt-4">
            <span className="text-gray-700">Price: </span>
            <span className="font-bold">Rs.{treatment.price}</span>
          </div>
          {/* book now button */}
          <div className="mt-4">
            <Link
              className="px-4 py-2 font-bold text-white bg-teal-700 rounded-2xl hover:bg-teal-950"
              to="/appointment"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Treatments = () => {
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/treatment/");
        if (response.status === 200) {
          setTreatments(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTreatments();
  }, []);

  return (
    <>
      <WebsiteNavbar />
      <br />
      <div className="h-screen mt-8 overflow-y-auto">
        <div className="min-h-screen mt-8 bg-gray-100">
          <div className="container px-4 py-8 mx-auto">
            <div className="grid grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
              {treatments.map((treatment) => (
                <TreatmentCard key={treatment._id} treatment={treatment} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Treatments;
