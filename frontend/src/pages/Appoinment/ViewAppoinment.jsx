import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchDoctorID, setSearchDoctorID] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/appointments");
      setAppointments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const searchByDoctorID = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/appointments?doctorID=${searchDoctorID}`);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error searching appointments by Doctor ID:", error);
    }
  };

  const updateStatus = async (appId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/updateappointments/${appId}`,
        { status: newStatus }
      );
      console.log("Status updated:", response.data);
      alert("Appointment status updated successfully.");
      fetchAppointments(); // Refresh the list after update
    } catch (error) {
      console.error("Error updating appointment status:", error);
      alert("Failed to update appointment status.");
    }
  };

  const deleteAppointment = async (appId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await axios.delete(`http://localhost:5000/deleteappointments/${appId}`);
        fetchAppointments(); // Refresh the list after deletion
        alert("Appointment deleted successfully.");
      } catch (error) {
        console.error("Error deleting appointment:", error);
        alert("Failed to delete appointment.");
      }
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "text-green-500";
      case "Approved":
        return "text-blue-500";
      case "Cancel":
        return "text-red-500";
      case "Completed":
        return "text-gray-500";
      default:
        return "text-black";
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Centering the title on the page
    const title = "Appointments Report";
    const pageWidth = doc.internal.pageSize.width;
    const txtWidth =
      doc.getStringUnitWidth(title) *
      doc.internal.getFontSize() /
      doc.internal.scaleFactor;
    const x = (pageWidth - txtWidth) / 2;
    doc.text(title, x, 20);

    // Generating the table below the title
    doc.autoTable({
      startY: 30,
      theme: "grid",
      head: [["Doctor ID", "Patient Name", "Date", "Time", "Reason", "Status"]],
      body: appointments.map((appointment) => [
        appointment.doctorID,
        appointment.patientName,
        new Date(appointment.App_date).toLocaleDateString(),
        appointment.App_time,
        appointment.App_reason,
        appointment.status,
      ]),
      styles: { fontSize: 8, cellPadding: 2, overflow: "linebreak" },
      columnStyles: { text: { cellWidth: "auto" } },
    });

    doc.save("appointments_report.pdf");
  };

  return (
    <div className="max-w-5xl h-[70vh] overflow-auto scrollbar-none mx-auto p-4 mt-20 mb-8">
      <div className="flex justify-between mb-4">
        <div>
          <input
            type="text"
            placeholder="Search Doctor ID"
            value={searchDoctorID}
            onChange={(e) => setSearchDoctorID(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={searchByDoctorID}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
          >
            Search
          </button>
        </div>
        <button
          onClick={generatePDF}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Generate Report
        </button>
      </div>
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead className="text-xs text-white bg-gray-800">
          <tr>
            <th className="px-2 py-2 border">Doctor ID</th>
            <th className="px-2 py-2 border">Patient Name</th>
            <th className="px-2 py-2 border">Date</th>
            <th className="px-2 py-2 border">Time</th>
            <th className="px-2 py-2 border">Reason</th>
            <th className="px-2 py-2 border">Status</th>
            <th className="px-2 py-2 border">Actions</th>
            <th className="px-2 py-2 border">Delete</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800">
          {appointments.map((appointment) => (
            <tr key={appointment.App_Id} className="bg-white hover:bg-gray-50">
              <td className="border px-4 py-2">{appointment.doctorID}</td>
              <td className="border px-4 py-2">{appointment.patientName}</td>
              <td className="border px-4 py-2">
                {new Date(appointment.App_date).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">{appointment.App_time}</td>
              <td className="border px-4 py-2">{appointment.App_reason}</td>
              <td className={`border px-4 py-2 ${statusColor(appointment.status)}`}>
                {appointment.status}
              </td>
              <td className="border px-4 py-2 flex flex-col gap-2">
                <button
                  onClick={() => updateStatus(appointment.App_Id, "Pending")}
                  className="text-yellow-600 hover:text-yellow-700 font-medium focus:outline-none border border-gray-300 rounded py-2 px-4"
                >
                  Pending
                </button>
                <button
                  onClick={() => updateStatus(appointment.App_Id, "Approved")}
                  className="text-green-600 hover:text-green-700 font-medium focus:outline-none border border-gray-300 rounded py-2 px-4"
                >
                  Approved
                </button>
                <button
                  onClick={() => updateStatus(appointment.App_Id, "Canceled")}
                  className="text-red-600 hover:text-red-700 font-medium focus:outline-none border border-gray-300 rounded py-2 px-4"
                >
                  Canceled
                </button>
                <button
                  onClick={() => updateStatus(appointment.App_Id, "Completed")}
                  className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none border border-gray-300 rounded py-2 px-4"
                >
                  Completed
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => deleteAppointment(appointment.App_Id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAppointment;
