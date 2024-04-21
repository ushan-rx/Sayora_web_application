import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeaveModal from './LeaveModal';

function StaffLeaves() {
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [leavesPerPage, setLeavesPerPage] = useState(10); // Adjust number of leaves per page as needed
    const [totalLeaves, setTotalLeaves] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [filters, setFilters] = useState({ staffId: '', staffName: '', dateRequested: '' });

    useEffect(() => {
        fetchLeaves(currentPage);
    }, [currentPage]);

    const fetchLeaves = async (page) => {
        try {
            const response = await axios.get(`http://localhost:5000/staff/leaves?page=${page}&limit=${leavesPerPage}`);
            setLeaves(response.data.leaves);
            setFilteredLeaves(response.data.leaves);
            setTotalLeaves(response.data.total); // Assuming the total number of leaves is returned by the API
        } catch (error) {
            console.error('Failed to fetch leaves', error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const openModal = (leave) => {
        setSelectedLeave(leave);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedLeave(null);
        fetchLeaves(currentPage); // Refresh data when modal is closed
    };

    const handleFilterChange = (type, value) => {
        setFilters(prev => ({ ...prev, [type]: value }));
        filterLeaves(type, value);
    };

    const filterLeaves = (type, value) => {
        let updatedLeaves = [...leaves];
        if (type === 'staffId') {
            updatedLeaves = updatedLeaves.filter(leave => leave.staffId.includes(value));
        } else if (type === 'staffName') {
            updatedLeaves = updatedLeaves.filter(leave => leave.name.toLowerCase().includes(value.toLowerCase()));
        } else if (type === 'dateRequested') {
            updatedLeaves = updatedLeaves.filter(leave => new Date(leave.leaveStartTime).toLocaleDateString().includes(value));
        }
        setFilteredLeaves(updatedLeaves);
    };

    const renderPagination = () => {
        if (!totalLeaves || totalLeaves <= 0 || !leavesPerPage || leavesPerPage <= 0) {
            return null; // Do not render pagination if no data or invalid pagination setup
        }
    
        const pageCount = Math.ceil(totalLeaves / leavesPerPage);
        if (pageCount === 0) {
            return null; // No pages to display
        }
    
        return (
            <div className="flex justify-center mt-4">
                {[...Array(pageCount)].map((_, i) => (
                    <button key={i} onClick={() => handlePageChange(i + 1)} 
                            className={`mx-1 px-3 py-2 rounded-md text-sm font-medium 
                            ${currentPage === i + 1 ? 'bg-cyan-700 text-white' : 'bg-white text-gray-700 border'}`}>
                        {i + 1}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-xl font-bold text-cyan-700 my-4">Staff Leaves Table</h1>
            <div className="flex gap-4 mb-4">
                <input type="text" placeholder="Filter by Staff ID" value={filters.staffId} onChange={(e) => handleFilterChange('staffId', e.target.value)} className="border rounded px-3 py-1" />
                <input type="text" placeholder="Filter by Name" value={filters.staffName} onChange={(e) => handleFilterChange('staffName', e.target.value)} className="border rounded px-3 py-1" />
                <input type="date" placeholder="Filter by Date" value={filters.dateRequested} onChange={(e) => handleFilterChange('dateRequested', e.target.value)} className="border rounded px-3 py-1" />
            </div>
            <table className="min-w-full table-auto bg-white shadow-md rounded">
                <thead className="bg-cyan-500 text-white">
                    <tr>
                        <th className="px-6 py-3">Leave ID</th>
                        <th className="px-6 py-3">Staff ID</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Job Role</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Start Time</th>
                        <th className="px-6 py-3">End Time</th>
                        <th className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLeaves.map(leave => (
                        <tr key={leave.leavesId} className="border-t">
                            <td className="px-6 py-4">{leave.leavesId}</td>
                            <td className="px-6 py-4">{leave.staffId}</td>
                            <td className="px-6 py-4">{leave.staffName}</td>
                            <td className="px-6 py-4">{leave.JobRole}</td>
                            <td className="px-6 py-4">{leave.status}</td>
                            <td className="px-6 py-4">{new Date(leave.leaveStartTime).toLocaleDateString()}</td>
                            <td className="px-6 py-4">{new Date(leave.leaveEndTime).toLocaleDateString()}</td>
                            <td className="px-6 py-4">
                                <button onClick={() => openModal(leave)} className="bg-cyan-300 text-white font-bold py-2 px-4 rounded">
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {renderPagination()}
            {modalOpen && <LeaveModal leave={selectedLeave} isOpen={modalOpen} onClose={closeModal} />}
        </div>
    );
}

export default StaffLeaves;
