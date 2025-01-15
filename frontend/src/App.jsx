import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import MoonPhaseCalculator from './MoonPhaseCalculator';
import HowItWorks from './HowItWorks';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';

function App() {
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/" element={<MoonPhaseCalculator />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
