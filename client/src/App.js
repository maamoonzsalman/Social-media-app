import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes instead of Switch
import './styles/App.css'
import Register from './components/Register'
import Login from './components/Login'
import Sidebar from './components/Sidebar';
import Profile from './components/Profile';
import UsersModal from './components/UsersModal';
import Search from './components/Search';
import EditProfile from './components/EditProfile';
import Settings from './components/Settings';

import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element ={<Login />} />
            <Route path='/' element ={<Sidebar />} />
            <Route path='/:username' element={<Profile />} />
            <Route path='/users/search' element={<Search/>} />
            <Route path='/users/:username/editprofile' element={<EditProfile />} />
            <Route path='/:username/settings' element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
