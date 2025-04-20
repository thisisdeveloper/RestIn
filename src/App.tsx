import React, { useEffect } from 'react';
import CustomerView from './pages/CustomerView';
import './index.css';

function App() {
  useEffect(() => {
    // Update the page title
    document.title = 'Smart Restaurant Menu';
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <CustomerView />
    </div>
  );
}

export default App;