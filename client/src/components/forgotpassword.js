import React, { useState } from "react";
import axios from 'axios';
import '../css/forgotpassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(''); 
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('/api/users/forgot-password', { email });
            setMessage(response.data.message);
            setError('');
        }
        catch (err) {
            setError(err.response ? err.response.data.message : 'An error occurred');
            setMessage('');
        }
    };

     return (
        <div className="forgot-password-container">
            <h2 className="forgot-password-header">Forgot Password</h2>
            <form className="forgot-password-form" onSubmit={handleSubmit}>
                <input className="forgot-password-input"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button className="forgot-password-submit" type="submit">Send Reset Link</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ForgotPassword;
