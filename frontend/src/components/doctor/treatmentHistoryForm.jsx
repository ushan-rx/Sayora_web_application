
import React, { useEffect, useState } from 'react';

import axios from 'axios';

function treatmentHistoryForm() {

  const [treatmentDetails, setTreatmentDetails] = useState([]);
  // to get treatments from backend
  const fetchTreatmentDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/doctor/');
      const data = await response.json();
      // Process the fetched treatment details here
    } catch (error) {
      console.error('Error fetching treatment details:', error);
    }
  };


  useEffect(() => {

    fetchTreatmentDetails();
  }, []);

  return (
    <div>treatMentHistoryForm</div>
  );
}

export default treatmentHistoryForm