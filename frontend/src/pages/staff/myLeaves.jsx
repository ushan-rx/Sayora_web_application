import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyLeaves = ({ staffId = "STF00011" }) => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/staff/leaves/std/${staffId}`);
        console.log(response.data);
        setLeaves(response.data.leaves || []);
      } catch (error) {
        console.error('Error fetching leave data:', error);
        setError("Failed to fetch leave data. Please try again.");
      }
    };

    fetchLeaves();
  }, [staffId]);

  const deleteLeave = async (leaveId) => {
    try {
      await axios.delete(`http://localhost:5000/staff/leaves/${leavesId}`);
      setLeaves(leaves.filter(leave => leave.leavesId !== leaveId));
    } catch (error) {
      console.error('Error deleting leave:', error);
      setError("Failed to delete leave. Please try again.");
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center m-4 overflow-auto" style={{ maxHeight: '80vh' }}>
      {leaves.length > 0 ? (
        leaves.map(leave => (
          <div key={leave.leavesId} className="bg-cyan-50 border-l-4 border-cyan-500 text-cyan-700 p-4 m-2 w-full max-w-md rounded shadow-lg">
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold">{leave.staffName} - {leave.jobRole}</h2>
              <p className="text-md mt-2"><strong>ID:</strong> {leave.leavesId}</p>
              <p className="text-md mt-2"><strong>Reason:</strong> <span style={{ wordWrap: 'break-word' }}>{leave.reason}</span></p>
              <p className="text-md mt-2"><strong>Start Time:</strong> {new Date(leave.leaveStartTime).toLocaleDateString()}</p>
              <p className="text-md mt-2"><strong>End Time:</strong> {new Date(leave.leaveEndTime).toLocaleDateString()}</p>
              <p className="text-md mt-2"><strong>Status:</strong> {leave.status}</p>
              <div className="flex mt-3">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1" onClick={() => console.log('Viewing', leave.leavesId)}>View</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-1" onClick={() => deleteLeave(leave.leavesId)}>Delete</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No leave data available.</div>
      )}
    </div>
  );
};

export default MyLeaves;
