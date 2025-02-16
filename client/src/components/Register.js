import React, {useEffect, useState, useContext} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import '../styles/Register.css'
import 'boxicons'

function Register() {
  
    const [message, setMessage] = useState('')
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: ''
    })
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(UserContext);

   const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/users', {
                formData
            }, { withCredentials: true });

            setMessage(response.data.message);

            // Set the user directly in context after successful registration
            if (response.data.userProfile) {
                setLoggedInUser(response.data.userProfile);
                navigate(response.data.redirectTo);
            } else {
                setMessage('Failed to retrieve user data after registration');
            }
            
        } catch (error) {
            setMessage('Error registering user');
            console.error('Error registering user:', error);
        }
    };
  
  return (

    <div>
    <form onSubmit={handleRegister} className="page">
        
        <div className='register-form'>
            <div className="field-container">
                <label className='username label'>Username</label>
                <input className='username input'
                type='text'
                required
                value = {formData.username}
                onChange={(e) => setFormData((prevFormData) => ({
                    ...prevFormData,
                    username: e.target.value
                }))}>
                </input>
            </div>
                
            <div className="field-container">
                <label className='password label'>Password</label>
                <input className='password input'
                type="password" 
                required
                value = {formData.password}
                onChange={(e) => setFormData((prevFormData) => ({
                    ...prevFormData,
                    password: e.target.value
                }))}>
                </input>
            </div>
            
            <div className="field-container">
                <label className='email label'>Email</label>
                <input className='email input'
                type="email" 
                required
                onChange={(e) => setFormData((prevFormData) => ({
                    ...prevFormData,
                    email: e.target.value
                }))}>
                </input>
            </div>
            
            <div className="field-container">
                <label className='firstname label'>First Name</label>
                <input className='firstname input'
                type="text" 
                required
                onChange={(e) => setFormData((prevFormData) => ({
                    ...prevFormData,
                    firstName: e.target.value
                }))}>      
                </input>
            </div>
            
            <div className="field-container">
                <label className='lastname label'>Last Name</label>
                <input className='lastname input'
                type="text" 
                required
                onChange={(e) => setFormData((prevFormData) => ({
                    ...prevFormData,
                    lastName: e.target.value
                }))}>
                </input>
            </div>
            
            <div className="field-container">
                <button className='register button' type="submit" required>Register</button>
            </div>
            
            <div className="field-container">
                <Link to='/login' className="login"><button className='button'>Already have an account? Click here to login.</button></Link>
            </div>
            {message && <p style={{ color: 'red' }}>{message}</p>}
        </div>
    </form>
    </div>

  );
}

export default Register;
