// src/components/CandidateForm.jsx
import { useState } from 'react';
import axios from 'axios';

const CandidateForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5274/api/candidate', form);
      onCreated(); // Refresh candidate list
      setForm({ fullName: '', email: '', phone: '' });
    } catch (err) {
      alert('Error creating candidate');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-bold mb-2">Add Candidate</h2>
      <div className="mb-2">
        <input type="text" name="fullName" placeholder="Full Name" value={form.fullName}
          onChange={handleChange} className="border p-2 w-full" required />
      </div>
      <div className="mb-2">
        <input type="email" name="email" placeholder="Email" value={form.email}
          onChange={handleChange} className="border p-2 w-full" required />
      </div>
      <div className="mb-2">
        <input type="text" name="phone" placeholder="Phone" value={form.phone}
          onChange={handleChange} className="border p-2 w-full" />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Candidate
      </button>
    </form>
  );
};

export default CandidateForm;