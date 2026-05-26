/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Halls from './pages/Halls';
import Booking from './pages/Booking';
import BookingSuccess from './pages/BookingSuccess';
import Availability from './pages/Availability';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Services from './pages/Services';
import Gaming from './pages/Gaming';
import Hoverboard from './pages/Hoverboard';
import FoodLounge from './pages/FoodLounge';
import GoKart from './pages/GoKart';
import Payment from './pages/Payment';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/halls" element={<Halls />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/hoverboard" element={<Hoverboard />} />
          <Route path="/food-lounge" element={<FoodLounge />} />
          <Route path="/go-kart" element={<GoKart />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}
