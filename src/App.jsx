import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import CandidateForm from './components/CandidateForm';
import CandidateList from './components/CandidateList';
import ProtectedRoute from './ProtectedRoute';
import Layout from './Layout';

const App = () => {
  
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Route */}
        <Route
          path="/CandidateForm"
          element={
            <ProtectedRoute>
              <Layout />
              <CandidateForm onCreated={handleRefresh} />
              <CandidateList key={refresh} />
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
