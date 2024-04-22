import { useEffect, useState } from 'react';
import axios from 'axios';
import { create } from 'zustand';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

// Zustand store
const useStore = create((set) => ({
  services: [],
  setServices: (services) => {
    if (Array.isArray(services)) {
      set({ services });
    } else {
      console.error('Invalid data format: services should be an array');
    }
  },
}));

const ServiceView = () => {
  const { services, setServices } = useStore();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/serviceAdding') // Adjust this to your actual API endpoint
      .then((response) => {
        console.log('API response:', response.data);
        
        // Check if response.data is valid and contains an array of services
        if (response.data && Array.isArray(response.data.service_data)) {
          // Set services in the Zustand store
          setServices(response.data.service_data);

          // Fetch doctor data for each service
          response.data.service_data.forEach(service => {
            axios.get(`http://localhost:5000/api/v1/doctor/${service.selectedDoctor}`) // Adjust this to your actual API endpoint
              .then((response) => {
                console.log('Doctor data for ID', service.selectedDoctor, ':', response.data);
                setDoctors(prevDoctors => ({
                  ...prevDoctors,
                  [service.selectedDoctor]: response.data.doctor,
                }));
              })
              .catch((error) => {
                console.error('Error fetching doctor data:', error);
              });
          });
        } else {
          console.error('Invalid data format: services should be an array');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [setServices]);

  const navigateToBookingForm = (serviceId) => {
    axios.get('http://localhost:5000/api/v1/serviceAdding', { serviceId }) // Adjust this to your actual API endpoint
    .then((response) => {
      console.log('API response:', response.data);
      
      // Store the serviceId in sessionStorage
      sessionStorage.setItem('selectedServiceId', serviceId);
      
      // Navigate to the serviceForm route
      navigate('/serviceForm');
    })
    .catch((error) => {
      console.error('Error updating service:', error);
    });
   
  };

  return (
    <>
   <div> <h1>Current Sessions</h1>
    <div className=" grid grid-cols-3 gap-4 mt-16 h-auto">
     {services.map((service) => {
  const doctor = doctors[service.selectedDoctor];
  
  return (
    <div key={service.serviceId} className="card bg-blue-200 border-3 border-black shadow-lg rounded-lg rounded px-8 pt-20 pb-8 m-16 mt-40  h-180">
      <div className="font-bold text-xl mb-2">{service.sess_name}</div>
      <p className="text-gray-700 md:text-base mt-2 whitespace-normal">{service.sess_description}</p>
      <div className="flex items-center">
        {doctor && <p className="text-gray-700 text-base">Host By : DR. {doctor.fName} {doctor.lName}</p>}
        {doctor && <img src={doctor.profilePic} alt="Doctor" className="ml-24 w-16 h-16 object-cover rounded-full" />}
      </div>
      <p className="text-gray-700 text-base">Status: {service.status}</p>
      <div className="flex justify-center mt-4">
        <button onClick={() => navigateToBookingForm(service.serviceId)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Book a Session
        </button>
      </div>
    </div>
  );
})}
    </div>
    </div>
    </>
  );
};

export default ServiceView;