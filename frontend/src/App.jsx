import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Packages from './pages/Packages';
import Reviews from './pages/Reviews';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/packages" element={<Packages/>}/>
                <Route path="/reviews" element={<Reviews/>}/>
                <Route path="/booking" element={<Booking/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/dashboard" element={<UserDashboard/>}/>
                <Route path="/admin" element={<AdminDashboard/>}/>
                <Route path="/employee" element={<EmployeeDashboard/>}/>
            </Routes>
        </Router>
    );
}
export default App;