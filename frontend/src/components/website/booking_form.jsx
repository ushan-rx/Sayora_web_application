import { create as createZustand } from "zustand";
import axios from "axios";

const useStore = createZustand((set, get) => ({
  bookingId: "",
  firstName: "",
  lastName: "",
  nic: "",
  email: "",
  phoneNumber01: "",
  phoneNumber02: "",
  bookingDate: "",
  time: "",
  organizationName: "",
  venue: "",
  participantCount: "",
  serviceId: (sessionStorage.getItem('selectedServiceId') || "") + "- Awareness Program",
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setNic: (nic) => set({ nic }),
  setEmail: (email) => set({ email }),
  setPhoneNumber01: (phoneNumber01) => set({ phoneNumber01 }),
  setPhoneNumber02: (phoneNumber02) => set({ phoneNumber02 }),
  setBookingDate: (bookingDate) => set({ bookingDate }),
  setTime: (time) => set({ time }),
  setOrganizationName: (organizationName) => set({ organizationName }),
  setVenue: (venue) => set({ venue }),
  setParticipantCount: (participantCount) => set({ participantCount }),
  setServiceId: (serviceId) => set({ serviceId: serviceId }),
  
  validate: () => {
    const {
      firstName,
      lastName,
      nic,
      email,
      bookingDate,
      phoneNumber01,
      phoneNumber02,
      time,
      organizationName,
      venue,
      participantCount
    } = get();
    if (
      !firstName ||
      !lastName ||
      !nic ||
      !email ||
      !bookingDate ||
      !phoneNumber01 ||
      !phoneNumber02 ||
      !time ||
      !organizationName ||
      !venue ||
      !participantCount
    ) {
      alert("Please fill all fields");
      return false;
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email");
      return false;
    }
    if (!(nic.length === 12 && /^[0-9]+[vV]$/.test(nic))) {
      alert("Please enter a valid NIC");
      return false;
    }
    if (!/^\d{10}$/.test(phoneNumber01)) {
      alert("Please enter a valid Phone Number 01");
      return false;
    }
    if (!/^\d{10}$/.test(phoneNumber02)) {
      alert("Please enter a valid Phone Number 02");
      return false;
    }

    if (phoneNumber01 === phoneNumber02) {
      alert("Phone Number 01 and Phone Number 02 cannot be the same");
      return false;
    }

    return true;
  },

  clearForm: () =>
    set({
      firstName: "",
      lastName: "",
      nic: "",
      email: "",
      bookingDate: "",
      phoneNumber01: "",
      phoneNumber02: "",
      time: "",
      organizationName: "",
      venue: "",
      participantCount: 0
    })
}));

const BookingForm = () => {
  const {
    firstName,
    lastName,
    nic,
    email,
    phoneNumber01,
    phoneNumber02,
    bookingDate,
    time,
    organizationName,
    venue,
    participantCount,
    serviceId,
    setFirstName,
    setLastName,
    setNic,
    setEmail,
    setPhoneNumber01,
    setPhoneNumber02,
    setBookingDate,
    setTime,
    setOrganizationName,
    setVenue,
    setParticipantCount,
    setServiceId,
    validate,
    clearForm
  } = useStore();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    // Prepare the data to be sent
    const data = {
      firstName,
      lastName,
      nic,
      email,
      phoneNumber01,
      phoneNumber02,
      bookingDate,
      time,
      organizationName,
      venue,
      participantCount,
      serviceId
    };

    console.log("Data to be sent:", data);

    axios
      .post("http://localhost:5000/api/v1/Booking_data", data)
      .then((response) => {
        if (response.status === 200) {
          console.log("Data passed successfully");
          console.log(response.data); // This will log the response data from the server
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
        className="relative w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto bg-white p-8 mt-36 mb-24 m-4 rounded shadow-md"
      >
        <h2 className="mt-8  text-2xl font-bold text-center"> {serviceId}</h2>
        <input
                type="hidden"
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
              />
        
        <fieldset className="mb-4 p-4 border-2 rounded">
          <legend className="text-gray-400 font-bold mb-2">
            Personal Details
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nic"
              >
                NIC
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nic"
                type="text"
                placeholder="NIC"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phoneNumer01"
              >
                Phone Number 01
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phoneNumber01"
                type="text"
                placeholder="Phone Number 01"
                value={phoneNumber01}
                onChange={(e) => setPhoneNumber01(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phoneNumer02"
              >
                Phone Number 02
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phoneNumber02"
                type="text"
                placeholder="Phone Number 02"
                value={phoneNumber02}
                onChange={(e) => setPhoneNumber02(e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="mb-4 p-4 border-2 rounded">
          <legend className="text-gray-400 font-bold mb-2">
            Booking Details
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="bookingDate"
              >
                Booking Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="bookingDate"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="time"
              >
                Time
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="organizationName"
              >
                Organization Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="organizationName"
                type="text"
                placeholder="Organization Name"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="venue"
              >
                Venue
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="venue"
                type="text"
                placeholder="Venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="participantCount"
              >
                Participant Count
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="participantCount"
                type="number"
                placeholder="Participant Count"
                value={participantCount}
                onChange={(e) => setParticipantCount(e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        {/* Add other fields in a similar manner */}
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
