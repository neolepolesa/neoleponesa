// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if the user exists
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            console.log('Logging in with', { username, password });
            navigate('/dashboard'); // Navigate to the dashboard if login is successful
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <form onSubmit={handleSubmit}>
                    <h2>Login to Wings Cafe</h2>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Login</button>
                    <p>Don't have an account? <a href="/register">Register here</a></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
