import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import MoonPhaseCalculator from './MoonPhaseCalculator';

function App() {
  return (
    <div>
      <Header />
      <MoonPhaseCalculator />
      <Footer />
    </div>
  );
}

export default App;
