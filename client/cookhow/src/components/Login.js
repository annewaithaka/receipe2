import React, { useState } from 'react';
import HttpClient from './HttpClient';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const LogInUser = async () => {
        try {
            await HttpClient.post('//localhost:5000/login', { email, password }); // Removed the unused 'resp' variable
            window.location.href = '/';
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('Invalid Email or Password');
            } else {
                console.error("An error occurred:", error);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        LogInUser();
    };

    return (
        <div className="w-full max-w-lg bg-slate-300 p-10 rounded-lg mr-40 shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Log-in</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
                    Log-in
                </button>
            </form>
        </div>
    );
}

export default Login;
