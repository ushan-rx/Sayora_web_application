import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AttendanceMarker = () => {
  const [marked, setMarked] = useState(false);
  const [attendanceId, setAttendanceId] = useState(null);
  const [lastMarkedDate, setLastMarkedDate] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState({ message: '', type: 'info' });

  useEffect(() => {
    // Retrieve marked state and last marked date from local storage
    const storedMarkedDate = localStorage.getItem('lastMarkedDate');
    const storedMarked = localStorage.getItem('marked') === 'true';
    const storedAttendanceId = JSON.parse(localStorage.getItem('attendanceId'));
  
    const today = new Date().toDateString();
    if (storedMarkedDate === today && storedMarked && storedAttendanceId) {
      setMarked(true);
      setLastMarkedDate(storedMarkedDate);
      setAttendanceId(storedAttendanceId);
    } else {
      localStorage.removeItem('marked');
      localStorage.removeItem('lastMarkedDate');
      localStorage.removeItem('attendanceId');
      setMarked(false);
    }
  
    // Automatically mark out if not done by 6 PM
    const timer = setTimeout(() => {
      if (marked && !attendanceId?.outTime) markOut();
    }, calculateTimeout());
    return () => clearTimeout(timer);
  }, [marked, attendanceId]);
  

  const calculateTimeout = () => {
    const now = new Date();
    const sixPM = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0);
    return sixPM - now;
  };

  const displayMessage = (message, type = 'info') => {
    setFeedbackMessage({ message, type });
    setTimeout(() => setFeedbackMessage({ message: '', type: 'info' }), 5000);
  };

  const markAttendance = async () => {
    const today = new Date().toDateString();
    if (lastMarkedDate === today) {
      displayMessage('Already marked attendance today.', 'error');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/staff/attendance', {
        staffId: Cookies.get("staffId"),
        staffName: Cookies.get("staffName"),
        JobRole: Cookies.get("staffRole")
      });
      setAttendanceId(response.data);
      setMarked(true);
      setLastMarkedDate(today);
      displayMessage('Attendance marked successfully.', 'success');

      // Store attendance state in local storage
      localStorage.setItem('marked', true);
      localStorage.setItem('lastMarkedDate', today);
      localStorage.setItem('attendanceId', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error marking attendance:', error);
      displayMessage('Failed to mark attendance.', 'error');
    }
  };

  const markOut = async () => {
    if (!attendanceId || !attendanceId.attendanceID) {
      displayMessage('No valid attendance ID available for clocking out.', 'error');
      return;
    }
    try {
      await axios.put(`http://localhost:5000/staff/attendance/${attendanceId.attendanceID}`, {
        OutTime: new Date()
      });
      setMarked(false);
      displayMessage('Clocked out successfully.', 'success');
  
      // Reset the local storage state when clocking out
      localStorage.removeItem('marked');
      localStorage.removeItem('lastMarkedDate');
      localStorage.removeItem('attendanceId');
    } catch (error) {
      console.error('Error marking out:', error);
      displayMessage('Failed to clock out.', 'error');
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <img src="https://www.clipartmax.com/png/full/12-127125_image-attendance-icon-png.png" alt="Attendance Clock" className="w-40 h-40" />
      <div>
        {feedbackMessage.message && (
          <div className={`text-lg font-semibold px-4 py-2 rounded ${feedbackMessage.type === 'error' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
            {feedbackMessage.message}
          </div>
        )}
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-400"
        onClick={markAttendance} disabled={marked}>
        Clock In
      </button>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={markOut} disabled={!marked}>
        Clock Out
      </button>
    </div>
  );
};

export default AttendanceMarker;

