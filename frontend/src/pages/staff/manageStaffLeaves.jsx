import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeaveModal from './LeaveModal';

function StaffLeaves() {
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [filters, setFilters] = useState({ staffId: '', staffName: '', dateRequested: '' });

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const response = await axios.get('http://localhost:5000/staff/leaves');
            setLeaves(response.data.leaves);
            setFilteredLeaves(response.data.leaves);
        } catch (error) {
            console.error('Failed to fetch leaves', error);
        }
    };

    const openModal = (leave) => {
        setSelectedLeave(leave);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedLeave(null);
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
            updatedLeaves = updatedLeaves.filter(leave => leave.staffName.toLowerCase().includes(value.toLowerCase()));
        } else if (type === 'dateRequested') {
            updatedLeaves = updatedLeaves.filter(leave => new Date(leave.leaveStartTime).toLocaleDateString().includes(value));
        }
        setFilteredLeaves(updatedLeaves);
    };

    function calculateDays(start, end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const timeDiff = endDate.getTime() - startDate.getTime(); 
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
        return Math.ceil(daysDiff);
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-xl font-bold text-cyan-700 my-4">Staff Leaves Table</h1>
            <div className="flex gap-4 mb-4">
                <input type="text" placeholder="Filter by Staff ID" value={filters.staffId} onChange={(e) => handleFilterChange('staffId', e.target.value)} className="border rounded px-3 py-1" />
                <input type="text" placeholder="Filter by Name" value={filters.staffName} onChange={(e) => handleFilterChange('staffName', e.target.value)} className="border rounded px-3 py-1" />
                <input type="date" placeholder="Filter by Date" value={filters.dateRequested} onChange={(e) => handleFilterChange('dateRequested', e.target.value)} className="border rounded px-3 py-1" />
            </div>
            <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
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
                            <th className="px-6 py-3">No of Days</th>
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
                              <td className="px-6 py-4">{calculateDays(leave.leaveStartTime, leave.leaveEndTime)}</td>
                              <td className="px-6 py-4">
                                  <button onClick={() => openModal(leave)} className="bg-cyan-300 text-white font-bold py-2 px-4 rounded">
                                      View Details
                                  </button>
                              </td>
                          </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {modalOpen && <LeaveModal leave={selectedLeave} isOpen={modalOpen} onClose={closeModal} />}
        </div>
    );
}

export default StaffLeaves;
