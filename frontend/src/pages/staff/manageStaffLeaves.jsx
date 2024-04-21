import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LeaveModal from './LeaveModal';

function StaffLeaves() {
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [notification, setNotification] = useState('');
    const [filters, setFilters] = useState({
        staffId: '',
        staffName: '',
        dateRequested: '',
        leavesId: '',
        status: '',
        JobRole:''
    });

    useEffect(() => {
        fetchLeaves();
    }, [filters]);

    const fetchLeaves = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        const offset = leaves.length;
        try {
            const response = await axios.get(`http://localhost:5000/staff/leaves?offset=${offset}&limit=8`);
            setLeaves(prevLeaves => [...prevLeaves, ...response.data.leaves]);
            setFilteredLeaves(prevLeaves => [...prevLeaves, ...response.data.leaves]);
            setHasMore(response.data.leaves.length > 0);
        } catch (error) {
            console.error('Failed to fetch leaves', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
            fetchLeaves();
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    const handleStatusChange = () => {
        setLeaves([]);
        setFilteredLeaves([]);
        setHasMore(true);
        fetchLeaves();
        setNotification('Action completed successfully.');
        setTimeout(() => setNotification(''), 3000);
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
        setLeaves([]);
        setFilteredLeaves([]);
        setHasMore(true);
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-xl font-bold text-cyan-700 my-4">Staff Leaves Table</h1>
            {notification && <div className="alert alert-success">{notification}</div>}
            <div className="flex gap-4 mb-4">
                {/* Input fields for filtering */}
                <input type="text" placeholder="Filter by Staff ID" value={filters.staffId} onChange={(e) => handleFilterChange('staffId', e.target.value)} className="border rounded px-3 py-1" />
                <input type="text" placeholder="Filter by Name" value={filters.staffName} onChange={(e) => handleFilterChange('staffName', e.target.value)} className="border rounded px-3 py-1" />
                <input type="date" placeholder="Filter by Date" value={filters.dateRequested} onChange={(e) => handleFilterChange('dateRequested', e.target.value)} className="border rounded px-3 py-1" />
                <input type="text" placeholder="Filter by Leave ID" value={filters.leavesId} onChange={(e) => handleFilterChange('leavesId', e.target.value)} className="border rounded px-3 py-1" />
                <select value={filters.status} onChange={(e) => handleFilterChange('status', e.target.value)} className="border rounded px-3 py-1">
                    <option value="">Filter by Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
            <table className="min-w-full table-auto bg-white shadow-md rounded">
                <thead className="bg-cyan-500 text-white">
                    <tr>
                        {/* Table headers */}
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
                            {/* Data cells */}
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
            {modalOpen && <LeaveModal leave={selectedLeave} isOpen={modalOpen} onClose={closeModal} onStatusChange={handleStatusChange} />}
        </div>
    );
}

export default StaffLeaves;
