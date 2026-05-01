// HOW TO RUN LOCALLY:
// 1. Clone the repo
// 2. BACKEND:
//    cd backend
//    npm install
//    Create .env file with MONGO_URI=<your MongoDB Atlas URI> and PORT=5000
//    npm run dev
// 3. FRONTEND:
//    cd frontend
//    npm install
//    npm run dev
// 4. Open http://localhost:5173 in your browser

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import ViewPost from './pages/ViewPost';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<ViewPost />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;