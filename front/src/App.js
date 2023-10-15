import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js'
import Order from './components/Order.js'
import Contact from './components/Contact.js'
import NotFound from './components/NotFound.js';
import Services from './components/Services.js'
import { AddressProvider } from './components/AddressProvider';

function App() {
  return (
    <AddressProvider>
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/order" element={<Order />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            {/* Catch-All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
      </Router>
    </AddressProvider>
  );
}

export default App;
