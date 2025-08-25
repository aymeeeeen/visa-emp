import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar visible on all pages */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/search" element={<Search />} /> {/* Search page */}
      </Routes>
      <Footer /> {/* Footer visible on all pages */}
    </Router>
  );
}

export default App;
