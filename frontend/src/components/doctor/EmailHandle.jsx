import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';




const EmailHandle = () => {
  const { state } = useLocation();
  const email = state?.email ?? '';

  const [reciver, setReciver] = useState(email);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);

  const sendEmail = (e) => {
    e.preventDefault();
    const sentDate = new Date().toISOString(); // Generate sentDate
    const receivedDate = new Date().toISOString(); // Generate receivedDate
    axios.post('http://localhost:5000/api/v1/email_handle', { reciver, subject, text: message, receivedDate, sentDate }) // Change 'message' to 'text'
      .then((response) => {
        console.log(response.data);
        setSentMessages([...sentMessages, { reciver, subject, text: message, receivedDate, sentDate }]); // Change 'message' to 'text'
        alert('Email sent and stored successfully!');
        setReciver("");
        setSubject("");
        setMessage("");
      }, (error) => {
        console.log(error);
      });
}

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/email_handle')
      .then((response) => {
        console.log('Response data:', response.data);
        if (Array.isArray(response.data)) {
          setSentMessages(response.data);
        } else {
          console.log('Warning: response data is not an array. Wrapping it in an array.');
          setSentMessages([response.data]);
        }
      })
      .catch((error) => {
        console.log('Error fetching emails:', error);
      });
  }, []);


  return (
    <div className="flex h-screen bg-gray-200">
      <div className="w-1/2 items-center justify-center flex">
     
        <form onSubmit={sendEmail} className=" w-full h-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-4 mt-16"> Mail</h1>
        <div className="mb-4 mt-8 ml-12">
  <label className="block text-gray-700 text-lg font-bold mb-4" htmlFor="email">
    Email
  </label>
  <input className="shadow appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" value={reciver} onChange={(e) => setReciver(e.target.value)} placeholder="Email" required />
</div>
<div className="mb-4 ml-12">
  <label className="block text-gray-700 text-lg font-bold mb-4" htmlFor="subject">
    Subject
  </label>
  <input className="shadow appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline" id="subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" required />
</div>
<div className="mb-6 ml-12">
  <label className="block text-gray-700 text-lg font-bold mb-4" htmlFor="message">
    Message
  </label>
  <textarea className="shadow appearance-none border-2 border-gray-200 rounded w-full h-48 py-2 px-3 text-gray-700 text-lg leading-tight focus:outline-none focus:shadow-outline" id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" required />
</div>
        <div className="flex items-center justify-center mt-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Send
          </button>
        </div>
        </form>
      </div>
      <div className="w-1/2 overflow-auto p-4 mt-16">
  <h1 className="text-2xl font-bold mb-4">Sent Mail</h1>
  {sentMessages.sort((a, b) => new Date(b.sentDate) - new Date(a.sentDate)).map((email, index) => {
  if (email && email.email_data) {
    return email.email_data.map((data, dataIndex) => (
      <div key={`${index}-${dataIndex}`} className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 mb-4">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{data.subject}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{data.body}</p>
          <p className="mt-1 max-w-2xl text-sm text-blue-600">Receiver: {data.reciver}</p>
          <p className="mt-1 max-w-2xl text-lg text-black-600">Message: {data.text}</p>
          <p className="mt-1 max-w-2xl text-sm text-green-500">Sent Date: {new Date(data.sentDate).toLocaleDateString()}</p>
        </div>
      </div>
    ));
  } else {
    return null;
  }
})}
      </div>
    </div>
  );
}

export default EmailHandle;