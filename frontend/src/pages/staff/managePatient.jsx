import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditPatientModal from './editPatient';
import DeletePatientModal from './deletePatient';

const ManagePatient = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchByIDTerm, setsearchByIDTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(10);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    filterPatients();
  }, [searchTerm,searchByIDTerm, patients]);





  const fetchPatients = () => {
    axios.get('http://localhost:5000/api/v1/patient')
      .then(response => {
        setPatients(response.data.patients);
        setFilteredPatients(response.data.patients);
      })
      .catch(error => console.error('Failed to fetch patients:', error));
  };

  const filterPatients = () => {
    const tempPatients = patients.filter(patient =>
      `${patient.fName} ${patient.lName}`.toLowerCase().includes(searchTerm.toLowerCase())&&
        patient.patientId.toString().includes(searchByIDTerm)
    );
    setFilteredPatients(tempPatients);
  };



  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const openEditModal = (patient) => {
    setCurrentPatient(patient);
    setEditModalOpen(true);
  };

  const closeEditModal = () => setEditModalOpen(false);

  const openDeleteModal = (patient) => {
    setCurrentPatient(patient);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleUpdate = (patientId, updatedData) => {
    axios.put(`http://localhost:5000/api/v1/patient/${patientId}`, updatedData) 
      .then(() => {
        fetchPatients(); // Refresh data
        closeEditModal();
      })
      .catch(error => console.error('Error updating patient:', error));
  };

  const handleDelete = (patientId) => {
    axios.put(`http://localhost:5000/api/v1/patient/${patientId}`, { status: false })
      .then(() => {
        fetchPatients(); 
        closeDeleteModal();
      })
      .catch(error => console.error('Error deleting patient:', error));
  };

  return (
    <div className="container mx-auto px-4" style={{ marginTop: '20px' }}>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded"
        />

        <input
          type="text"
          placeholder="Search by ID"
          value={searchByIDTerm}
          onChange={(e) => setsearchByIDTerm(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded"
        />
   

        <a href="http://localhost:5173/staff/ManagePatients/add" className="ml-2 inline-block bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
  Add Patient
</a>

      </div>
      <table className="min-w-full bg-white shadow overflow-hidden rounded-lg">
        <thead>
          <tr className="bg-cyan-500 text-white">
          <th className="py-2 px-4">Pic</th>
            <th className="py-2 px-4">Patient ID</th>
            <th className="py-2 px-4">User ID</th>
           
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPatients.map((patient) => (
            <tr key={patient.patientId}>
 <td className="text-center">
  <div className="inline-block rounded-full overflow-hidden w-10 h-10">
    {patient.profilePic ? (
      <img
        src={patient.profilePic}
        alt="Profile Pic"
        className="object-cover w-full h-full"
      />
    ) : (
      <img
        src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" 
        alt="Default Profile Pic"
        className="object-cover w-full h-full"
      />
    )}
  </div>
</td>

              <td className="text-center">{patient.patientId}</td>
              <td className="text-center">{patient.userId}</td>
             
             
              <td className="text-center">{`${patient.fName} ${patient.lName}`}</td>
              <td className="text-center">{patient.phone}</td>
              <td className="text-center">{patient.status ? 'Active' : 'Inactive'}</td>
              <td className="text-center">
                <button onClick={() => openEditModal(patient)} className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded mr-3">
                  Edit
                </button>
                <button onClick={() => openDeleteModal(patient)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <div className="inline-flex">
          {Array.from({ length: Math.ceil(filteredPatients.length / patientsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 border ${currentPage === i + 1 ? 'bg-cyan-500 text-white' : 'bg-white text-cyan-500'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      {editModalOpen && (
        <EditPatientModal
          isOpen={editModalOpen}
          handleClose={closeEditModal}
          patient={currentPatient}
          handleUpdate={handleUpdate}
        />
      )}
      {deleteModalOpen && (
        <DeletePatientModal
          isOpen={deleteModalOpen}
          handleClose={closeDeleteModal}
          patientId={currentPatient.patientId}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ManagePatient;
