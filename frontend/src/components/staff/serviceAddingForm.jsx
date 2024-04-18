import { useEffect } from 'react';
import axios from 'axios';
import { create as createZustand } from 'zustand';

const useStore = createZustand((set, get) => ({
  sess_name: '',
  sess_description: '',
  selectedDoctor: '',
  status: '',
  doctors: [],
  setSessName: (sess_name) => set({ sess_name }),
  setSessDescription: (sess_description) => set({ sess_description }),
  setSelectedDoctor: doctorId => set({ selectedDoctor: doctorId }),
  setStatus: (status) => set({ status }),
  setDoctors: (doctors) => set({ doctors }),
  validate: () => {
    const { sess_name, sess_description, selectedDoctor, status } = get();
    if (!sess_name || !sess_description || !selectedDoctor || !status) {
      alert("Please fill all fields");
      return false;
    }
    return true;
  },
  clearForm: () =>
    set({
      sess_name: '',
      sess_description: '',
      host_doctor_id: '',
      status: ''
    })
}));

const ServiceAddingForm = () => {
  const {
    sess_name,
    sess_description,
    selectedDoctor, 
    setSelectedDoctor,
    status,
    doctors,
    setSessName,
    setSessDescription,
    setStatus,
    setDoctors,
    validate,
    clearForm
  } = useStore();

  useEffect(() => {
    // Fetch doctors from the server
    axios.get('http://localhost:5000/api/v1/doctor/')
    .then(response => {
      // Check if the response data is an array
      if (Array.isArray(response.data.doctors)) {
        // Set the fetched doctors in the store
        setDoctors(response.data.doctors);
      } else {
        console.error('Unexpected server response:', response.data);
      }
    })
      .catch(error => {
        console.error('There was an error fetching doctors:', error);
      });
  }, [setDoctors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    const data = {
      sess_name,
      sess_description,
      selectedDoctor,
      status
    };

    console.log("Data to be sent:", data);

    axios
      .post("http://localhost:5000/api/v1/serviceAdding/", data)
      .then((response) => {
        if (response.status === 200) {
          console.log("Data passed successfully");
          console.log(response.data);
          clearForm();

          window.alert("Form submitted successfully!");
          window.location.reload();
        } else {
          console.log("Data not passed successfully");

          clearForm();
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen relative">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto bg-white p-8 mb-48 rounded shadow-md"
      >
        <h2 className="mt-8  text-2xl font-bold text-center">Add a Service</h2>
        <fieldset className="mb-4 p-4 border-2 rounded">
          <legend className="text-gray-400 font-bold mb-2">
            Service Details
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="sess_name"
              >
                Session Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="sess_name"
                type="text"
                placeholder="Session Name"
                value={sess_name}
                onChange={(e) => setSessName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="sess_description"
              >
                Session Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="sess_description"
                placeholder="Session Description"
                value={sess_description}
                onChange={(e) => setSessDescription(e.target.value)}
                maxLength={200}
              />
              <span>{sess_description.length}/200</span>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="host_doctor_id"
              >
                Host Doctor
              </label>
              <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="host_doctor_id"
            value={selectedDoctor}
            onChange={(e) => {
              console.log("Selected doctor ID:", e.target.value);
              setSelectedDoctor(e.target.value);
            }}
          >
            <option value="">Select Doctor</option>
            {Array.isArray(doctors) && doctors.map((doctor) => (
              <option key={doctor.doctorId} value={doctor.doctorId}>
               {doctor.doctorId} - {doctor.fName} {doctor.lName}
              </option>
            ))}
          </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="status"
              >
                Status
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </fieldset>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceAddingForm;