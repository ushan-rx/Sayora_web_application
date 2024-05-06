import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditDoctorModal from './editDoctor';
import DeleteDoctorModal from './deleteDoctor';

const ManageDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(10);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [searchTerm, doctors]);

  const fetchDoctors = () => {
    axios.get('http://localhost:5000/api/v1/doctor')
      .then(response => {
        setDoctors(response.data.doctors);
        setFilteredDoctors(response.data.doctors);
      })
      .catch(error => console.error('Failed to fetch doctors:', error));
  };

  const filterDoctors = () => {
    const tempDoctors = doctors.filter(doctor =>
      `${doctor.fName} ${doctor.lName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(tempDoctors);
  };

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const openEditModal = (doctor) => {
    setCurrentDoctor(doctor);
    setEditModalOpen(true);
  };

  const closeEditModal = () => setEditModalOpen(false);

  const openDeleteModal = (doctor) => {
    setCurrentDoctor(doctor);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleUpdate = (doctorId, updatedData) => {
    axios.put(`http://localhost:5000/api/v1/doctor/${doctorId}`, updatedData)
      .then(() => {
        fetchDoctors(); // Refresh data
        closeEditModal();
      })
      .catch(error => console.error('Error updating doctor:', error));
  };

  const handleDelete = (doctorId) => {
    axios.put(`http://localhost:5000/api/v1/doctor/${doctorId}`, { status: false })
      .then(() => {
        fetchDoctors(); // Refresh data
        closeDeleteModal();
      })
      .catch(error => console.error('Error deleting doctor:', error));
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
            <a href="http://localhost:5173/staff/ManageStaff/add" className="ml-2 inline-block bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">
  Add Doctor
</a>

      </div>
      <table className="min-w-full bg-white shadow overflow-hidden rounded-lg">
        <thead>
          <tr className="bg-cyan-500 text-white">
          <th className="py-2 px-4">Picture</th>
            <th className="py-2 px-4">Doctor ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4">Specialization</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentDoctors.map((doctor) => (
            <tr key={doctor.doctorId}>

<td className="text-center">
  <div className="inline-block rounded-full overflow-hidden w-10 h-10">
    {doctor.profilePic ? (
      <img
        src={doctor.profilePic}
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
              <td className="text-center">{doctor.doctorId}</td>
              <td className="text-center">{`${doctor.fName} ${doctor.lName}`}</td>
              <td className="text-center">{doctor.phone}</td>
              <td className="text-center">{doctor.specialization.map(s => s.name).join(', ')}</td>
              <td className="text-center">
                <button onClick={() => openEditModal(doctor)} className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded mr-3">
                  Edit
                </button>
                <button onClick={() => openDeleteModal(doctor)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <div className="inline-flex">
          {Array.from({ length: Math.ceil(filteredDoctors.length / doctorsPerPage) }, (_, i) => (
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
        <EditDoctorModal
          isOpen={editModalOpen}
          handleClose={closeEditModal}
          doctor={currentDoctor}
          handleUpdate={handleUpdate}
        />
      )}
      {deleteModalOpen && (
        <DeleteDoctorModal
          isOpen={deleteModalOpen}
          handleClose={closeDeleteModal}
          doctorId={currentDoctor.doctorId}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ManageDoctor;
