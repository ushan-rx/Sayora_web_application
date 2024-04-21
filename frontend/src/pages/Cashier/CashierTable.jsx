import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Table, Space } from 'antd';
import { Link } from 'react-router-dom';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const { Column } = Table;

function CashierTable() {
    const [reqData, setReqData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/cashier/");
            setReqData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/cashier/${id}`);
            setReqData(reqData.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error deleting record", error);
        }
    };
//-------------------
const handleDownload = (record) => {
    try {
        
        const pdf = new jsPDF();

        const headers = ["Field", "Value"];
        const data = [
            ["Patient Id", record.patientId],
// -------------------------------------------------------------------------------------
            ["Patient Name", record.patientName],
            ["docName", record.docName],
            ["Doctor Fee", record.docFee],
            ["Treatment Name", record.treatmentName],
            ["Treatment Fee", record.treatmentFee],
            ["Discount", record.discount],
            ["Total", record.total]
        ];

        let startY = 20;
        const margin = 20;
        const padding = 4;

        const columnWidth = pdf.internal.pageSize.getWidth() / 2 - margin * 2;

        headers.forEach((header, index) => {
            pdf.text(margin + index * columnWidth, startY + padding * 2, header);
        });

        data.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                pdf.text(margin + cellIndex * columnWidth, startY + (rowIndex + 2) * padding * 2, cell);
            });
        });

        const filename = 'record_${record._id}.pdf';

        pdf.save(filename);
    } catch (error) {
        console.error("Error downloading record details", error);
    }
};
 


//-------------------

    const handleSearch = () => {
        // Filter the data based on the search keyword
        // Convert searchKeyword to lowercase for case-insensitive search
        const filteredData = reqData.filter(cash =>
            cash.patientId.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setReqData(filteredData);
    };

    const handleGenerateReport = async () => {
        try {
            // Convert HTML to canvas
            const canvas = await html2canvas(document.getElementById('report-container'));

            // Convert canvas to PDF
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
            
            // Download PDF
            pdf.save('cashier_report.pdf');
        } catch (error) {
            console.error("Error generating report", error);
        }
    };

    return (
        <div className="mt-10">
            <div className="text-center">
                <Input
                    placeholder="Search by Patient ID"
                    style={{ width: 200, marginBottom: '10px' }}
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <Button type="primary" onClick={handleSearch} style={{ marginBottom: '10px', marginLeft: '10px' }}>Search</Button>
                <Button type="primary" onClick={handleGenerateReport} style={{ marginBottom: '10px', marginLeft: '10px' }}>Generate Report</Button>
                <div id="report-container">
                    <Table dataSource={reqData} bordered style={{ width: '80%', margin: 'auto' }}>
                        <Column title="Patient Id" dataIndex="patientId" key="patientId" />
                        <Column title="Patient Name" dataIndex="patientName" key="patientName" /> 
                        <Column title="Doctor Name" dataIndex="docName" key="docName" />
                        <Column title="Doctor Fee" dataIndex="docFee" key="docFee" />
                        <Column title="Treatment Name" dataIndex="treatmentName" key="treatmentName" />
                        <Column title="Treatment Fee" dataIndex="treatmentFee" key="treatmentFee" />
                        <Column title="Discount" dataIndex="discount" key="discount" />
                        <Column title="Total" dataIndex="total" key="total" />
                        <Column
                            title="Action"
                            key="action"
                            render={(text, record) => (
                                <Space size="middle">
                                    <Link to={`staff/updateCash/${record._id}`}>Edit</Link>
                                    <Button type="link" danger onClick={() => handleDelete(record._id)}>Delete</Button>
                                </Space>
                            )}
                        />
                    </Table>
                </div>
            </div>
        </div>
    );
}



export default CashierTable;