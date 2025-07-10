// src/components/CandidateList.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = () => {
    axios.get('http://localhost:5274/api/candidate')
      .then(res => setCandidates(res.data))
      .catch(err => console.error('Error fetching candidates:', err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      console.log('Deleting ID:', id);
      axios.delete(`http://localhost:5274/api/candidate/${id}`)
        .then(() => {
          // Remove the deleted candidate from the state
          setCandidates(prev => prev.filter(c => c.id !== id));
        })
        .catch(err => console.error('Error deleting candidate:', err));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Candidate List</h2>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Full Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Applied At</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(c => (
            <tr key={c.id}>
              <td className="border px-4 py-2">{c.id}</td>
              <td className="border px-4 py-2">{c.fullName}</td>
              <td className="border px-4 py-2">{c.email}</td>
              <td className="border px-4 py-2">{c.phone}</td>
              <td className="border px-4 py-2">{new Date(c.appliedAt).toLocaleString()}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;