// src/App.jsx
/* import { useState } from 'react';
import CandidateForm from './components/CandidateForm';
import CandidateList from './components/CandidateList';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Sharp Recruit</h1>
      <CandidateForm onCreated={handleRefresh} />
      <CandidateList key={refresh} />
    </div>
  );
}

export default App; */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import CandidateForm from './components/CandidateForm';
import CandidateList from './components/CandidateList';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Route */}
        <Route
          path="/form"
          element={
            <ProtectedRoute>
              <CandidateForm />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
