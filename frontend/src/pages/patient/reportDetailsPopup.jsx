import React from 'react';

const ReportDetailsPopup = ({ report, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{report.reportName}</h2>
        <p>Date: {report.date}</p>
        <p>Time: {report.time}</p>
        {/* Add other details here */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ReportDetailsPopup;
