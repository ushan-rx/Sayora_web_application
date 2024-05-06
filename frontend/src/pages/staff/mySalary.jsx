import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SalaryDetailsPopup from './SalaryReport';
import Cookies from "js-cookie";

const SalaryManagementPage = () => {
  const staffId = Cookies.get("staffId")
  
  

  const [salaryData, setSalaryData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [filters, setFilters] = useState({
    salaryId: '',
    staffName: '',
    salaryMonth: ''
  });


  const formatDate = (dateString) => {
    const [year, month] = dateString.split('-');
    const date = new Date(year, month - 1); // Month is 0-indexed in JS Date
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salaryResponse = await axios.get(`http://localhost:5000/staff/salary/staff/${staffId}`);
        if (Array.isArray(salaryResponse.data.salary)) {

          const formattedData = salaryResponse.data.salary.map(item => ({
            ...item,
            salaryMonth: formatDate(item.salaryMonth)
          }));
          setSalaryData(formattedData);
        } else {
          console.error('Expected an array, but received:', salaryResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [staffId]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredData = salaryData.filter(salary =>
    (salary.salaryId.includes(filters.salaryId) || filters.salaryId === '') &&
    (salary.staffName && salary.staffName.toLowerCase().includes(filters.staffName.toLowerCase()) || filters.staffName === '') &&
    (salary.salaryMonth && salary.salaryMonth.toLowerCase().includes(filters.salaryMonth.toLowerCase()) || filters.salaryMonth === '')
  );
  

  return (
    <div className="container mx-auto" style={{ color: 'cyan-500' }}>
      <h1 className="text-xl font-bold text-cyan-700 my-4">Salary Data for Staff ID: {staffId}</h1>
      <div className="my-4">
        <input
          type="text"
          value={filters.salaryId}
          onChange={handleFilterChange}
          name="salaryId"
          placeholder="Filter by Salary ID"
          className="mr-2 px-2 py-1"
        />
        <input
          type="text"
          value={filters.staffName}
          onChange={handleFilterChange}
          name="staffName"
          placeholder="Filter by Staff Name"
          className="mr-2 px-2 py-1"
        />
        <input
          type="text"
          value={filters.salaryMonth}
          onChange={handleFilterChange}
          name="salaryMonth"
          placeholder="Filter by Salary Month"
          className="px-2 py-1"
        />
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr className='bg-cyan-500 text-white'>
            <th className="px-4 py-2">Salary ID</th>
            <th className="px-4 py-2">Staff Name</th>
            <th className="px-4 py-2">Salary Month</th>
            <th className="px-4 py-2">Base Salary</th>
            <th className="px-4 py-2">Deductions</th>
            <th className="px-4 py-2">Bonus</th>
            <th className="px-4 py-2">Net Salary</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(salary => (
            <tr key={salary.salaryId}>
              <td className="border px-4 py-2">{salary.salaryId}</td>
              <td className="border px-4 py-2">{salary.staffName}</td>
              <td className="border px-4 py-2">{salary.salaryMonth}</td>
              <td className="border px-4 py-2">{salary.baseSalary}</td>
              <td className="border px-4 py-2">{salary.deductions}</td>
              <td className="border px-4 py-2">{salary.Bonus}</td>
              <td className="border px-4 py-2">{salary.netSalary}</td>
              <td className="border px-4 py-2">
                <button onClick={() => { setSelectedSalary(salary); setIsOpen(true); }} className="bg-cyan-500 text-white px-4 py-2 rounded">View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <SalaryDetailsPopup
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        salary={selectedSalary}
        staff={staffId}
      />
    </div>
  );
}

export default SalaryManagementPage;
