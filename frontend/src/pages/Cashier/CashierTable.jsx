        import React, { useState, useEffect } from 'react';
        import axios from 'axios';
        import { Input, Button, Table, Space } from 'antd';
        import { Link } from 'react-router-dom';
        import { saveAs } from 'file-saver';
        import html2canvas from 'html2canvas';
        import jsPDF from 'jspdf';
import { set } from 'date-fns';

        const { Column } = Table;

        function CashierTable() {
            const [reqData, setReqData] = useState([]);
            const [originalData, setOriginalData] = useState([]);
            const [searchKeyword, setSearchKeyword] = useState('');

            useEffect(() => {
                fetchData();
            }, []);

            const fetchData = async () => {
                try {
                    const response = await axios.get("http://localhost:5000/cashier/");
                    setReqData(response.data);
                    setOriginalData(response.data);
                } catch (error) {
                    console.error(error);
                }
            };

            const handleDelete = async (id) => {
                try {
                    await axios.delete(`http://localhost:5000/cashier/${id}`);
                    setReqData(reqData.filter(item => item._id !== id));
                    alert('Data deleted');
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


            const generateReceipt = (record) => {
                const doc = new jsPDF();
            
                // Draw a border around the entire page
                doc.setLineWidth(1); // Set the line width to 1
                doc.rect(10, 10, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 20);
            
                doc.setFontSize(18);
                doc.text("Sayora Health & Wellness Clinic", 20, 30); // Adjusted to fit within the border
            
                // Add current date and time
                const now = new Date();
                const printTime = `Date: ${now.toLocaleDateString()} Time: ${now.toLocaleTimeString()}`;
                doc.setFontSize(12);
                doc.text(printTime, 20, 40);
            
                // Populate PDF with data from record
                const { patientId, patientName, docName, docFee, treatmentName, treatmentFee, discount, total } = record;
                const data = [
                    [`Patient Name : ${patientName}`, 20, 60],
                    [`Doctor Name: ${docName}`, 20, 70],
                    [`Treatment Name: ${treatmentName}`, 20, 80],
                    [`Doctor Fee: ${docFee}`, 20, 90],
                    [`Treatment Fee: ${treatmentFee}`, 20, 100],
                    [`Discount: ${discount}`, 20, 110],
                    [`Total: ${total}`, 20, 120]
                ];
            
                data.forEach(([text, x, y]) => {
                    doc.text(text, x, y);
                });
            
                // Add more content to the PDF as needed
            
                doc.save("invoice.pdf");
            };
            const handleReset = () => {
                setSearchKeyword(""); // Clear the search keyword
                setReqData(originalData); // Reset the data to its original state
            };
            return (
            <div>
                <div className="mt-10">
                    <div className="text-center">
                    <Input
                        placeholder="Search by Patient ID"
                        className="w-48 border-2 border-gray-300 rounded-md p-2 mb-2"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <Button type="primary" onClick={handleSearch} className="ml-4 my-3 bg-blue-500 text-white rounded-md px-6   mb-2">Search</Button>
                        <Button type="primary" onClick={handleReset} className="ml-4 my-3 bg-red-500 text-white rounded-md px-6 mb-2">Reset</Button>
                        <div id="report-container" className="  mx-auto">
                                <Table dataSource={reqData} bordered  bg-blue className="w-4/5  mx-auto">
                                <Column className="bg-slate-400" title="Patient Id" dataIndex="patientId" key="patientId" />
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
                            <Link to={`staff/updateCash/${record._id}`} className="text-blue-500 hover:underline">Edit</Link>
                            <Button type="link" danger onClick={() => handleDelete(record._id)} className="text-red-500 hover:underline">Delete</Button>
                            <button
                                className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded-2xl hover:bg-blue-700"
                                onClick={() => generateReceipt(record)}
                            >    Download Receipt
                            </button>
                        </Space>
                    )}
                />
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            );
        }



        export default CashierTable;