import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerView from './pages/CustomerView';
import OrdersPage from './pages/OrdersPage';
import AccountPage from './pages/AccountPage';
import './index.css';

function App() {
  useEffect(() => {
    // Update the page title
    document.title = 'Smart Restaurant Menu';
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<CustomerView />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;