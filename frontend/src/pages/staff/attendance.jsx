import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Attendance() {
    const [attendances, setAttendances] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/staff/attendance');
                setAttendances(response.data.attendances);
                setFilteredData(response.data.attendances);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
    }, []);

    const handleFilter = (event) => {
        event.preventDefault();
        const { date, month, staffId, staffName } = event.target.elements;
        
        let filtered = attendances.filter(a => {
            return (staffId.value ? a.staffId.includes(staffId.value) : true) &&
                   (staffName.value ? a.staffName.toLowerCase().includes(staffName.value.toLowerCase()) : true) &&
                   (date.value ? new Date(a.AttendanceDate).toISOString().split('T')[0] === date.value : true) &&
                   (month.value ? new Date(a.AttendanceDate).getMonth() === new Date(`${month.value}-01`).getMonth() : true);
        });
        setFilteredData(filtered);
    };

    // Calculate hours worked
    const calculateHoursWorked = (inTime, outTime) => {
        if (!outTime) return 'N/A';
        const inDate = new Date(inTime);
        const outDate = new Date(outTime);
        const hoursWorked = ((outDate - inDate) / 3600000).toFixed(2);
        return `${hoursWorked} hours`;
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleFilter} className="mb-4 flex gap-3">
                <input type="date" name="date" className="rounded px-4 py-2 border"/>
                <input type="month" name="month" className="rounded px-4 py-2 border"/>
                <input type="text" name="staffId" placeholder="Staff ID" className="rounded px-4 py-2 border"/>
                <input type="text" name="staffName" placeholder="Staff Name" className="rounded px-4 py-2 border"/>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Apply Filters</button>
            </form>
            <div className="overflow-auto" style={{ height: "550px" }}>  
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">In Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Out Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours Worked</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredData.map((attendance, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">{attendance.staffId}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{attendance.staffName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(attendance.AttendanceDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(attendance.InTime).toLocaleTimeString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{attendance.OutTime ? new Date(attendance.OutTime).toLocaleTimeString() : 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{calculateHoursWorked(attendance.InTime, attendance.OutTime)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Attendance;
