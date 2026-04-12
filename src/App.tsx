// src/App.tsx

import { useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { Chapter1 } from './components/Chapter1';
import { Chapter2 } from './components/Chapter2';
import { Chapter3 } from './components/Chapter3';
import { Chapter4 } from './components/Chapter4';
import { Chapter5 } from './components/Chapter5';
import { Chapter6 } from './components/Chapter6';
import { Chapter7 } from './components/Chapter7';
import { Navigation } from './components/common';
import { StatsDashboard } from './components/Admin/StatsDashboard';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if URL hash is #admin for admin dashboard
    const checkAdmin = () => {
      setIsAdmin(window.location.hash === '#admin');
    };

    checkAdmin();
    window.addEventListener('hashchange', checkAdmin);
    return () => window.removeEventListener('hashchange', checkAdmin);
  }, []);

  if (isAdmin) {
    return <StatsDashboard />;
  }

  return (
    <div className="antialiased">
      <Navigation />
      <Hero />
      <Chapter1 />
      <Chapter2 />
      <Chapter3 />
      <Chapter4 />
      <Chapter5 />
      <Chapter6 />
      <Chapter7 />
    </div>
  );
}

export default App;
