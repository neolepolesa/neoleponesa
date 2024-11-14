// src/components/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [newUser, setNewUser] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const registerUser = (event) => {
        event.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if the username already exists
        if (users.find(u => u.username === newUser.username)) {
            alert('Username already exists');
            return;
        }

        // Add the new user
        const user = { id: Date.now(), ...newUser };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful');
        setNewUser({ username: '', password: '' });
        
        navigate('/'); // Redirect to login page after registration
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <form onSubmit={registerUser}>
                    <h2>Register for Wings Cafe</h2>
                    <input
                        type="text"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
