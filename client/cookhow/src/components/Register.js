// import React, { useState } from 'react';
// import HttpClient from './HttpClient';
// import signUp_pic from "../assets/signUp_pic.png";
// import "./Register.css";


// function Register() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');


//     const registerUser = async () => {
//         try {
//             // Removed 'resp' variable since it's not used
//             await HttpClient.post('//localhost:5000/register', { name, email, password });
//             alert('Registration successful. Please log in.');
//             window.location.href = '/login'; // Redirect to login page
//         } catch (error) {
//             console.error('Error during registration:', error);
//             alert('An error occurred during registration. Please try again.');
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         registerUser();
//     };

//     // return (
//     //     <div className="w-full max-w-lg bg-slate-300 p-10 rounded-lg shadow-lg">
//     //         <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
//     //         <form onSubmit={handleSubmit} className="space-y-4">
//     //             <div>
//     //                 <label className="block text-gray-700">Name</label>
//     //                 <input
//     //                     type="text"
//     //                     value={name}
//     //                     onChange={(e) => setName(e.target.value)}
//     //                     className="w-full px-3 py-2 border rounded-lg"
//     //                     required
//     //                 />
//     //             </div>
//     //             <div>
//     //                 <label className="block text-gray-700">Email</label>
//     //                 <input
//     //                     type="text"
//     //                     value={email}
//     //                     onChange={(e) => setEmail(e.target.value)}
//     //                     className="w-full px-3 py-2 border rounded-lg"
//     //                     required
//     //                 />
//     //             </div>
//     //             <div>
//     //                 <label className="block text-gray-700">Password</label>
//     //                 <input
//     //                     type="password"
//     //                     value={password}
//     //                     onChange={(e) => setPassword(e.target.value)}
//     //                     className="w-full px-3 py-2 border rounded-lg"
//     //                     required
//     //                 />
//     //             </div>
//     //             <div>
//     //                 <label className="block text-gray-700">Password</label>
//     //                 <input
//     //                     type="confirmPassword"
//     //                     value={confirmPassword}
//     //                     onChange={(e) => setConfirmPassword(e.target.value)}
//     //                     className="w-full px-3 py-2 border rounded-lg"
//     //                     required
//     //                 />
//     //             </div>
//     //             <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
//     //                 Register
//     //             </button>
//     //         </form>
//     //     </div>
//     // );
//     return (
//         <div className="sign-up-modal">
//           <div className="left-image-section">
//             <img src={signUp_pic} alt="Welcome" className="left-image" />
//             <div className="join-text">Join Today</div>
//           </div>
//           <div className="sign-up-form">
//             <h2>Sign Up</h2>
//             {error && <div className="error">{error}</div>}
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <div className="form-field">
//                   <label>First Name</label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-field">
//                   <label>Last Name</label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="form-field">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-field">
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="form-field">
//                 <label>Re-enter password</label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="terms">
//                 <input type="checkbox" required />
//                 <label>
//                   I have read and agree to terms of service and privacy policy.
//                 </label>
//               </div>
//               <button className="sign-up-button" type="submit">
//                 Sign Up
//               </button>
//             </form>
//             <div className="or">Or</div>
//             <div className="social-sign-up">
//               <button className="google-button">
//                 <img src="https://placeholder.pics/svg/24x24" alt="Google" />
//                 Sign Up with Google
//               </button>
//               <button className="facebook-button">
//                 <img src="https://placeholder.pics/svg/24x24" alt="Facebook" />
//                 Sign Up with Facebook
//               </button>
//             </div>
//           </div>
//         </div>
//       );
// }

// export default Register;

import React, { useState } from "react";
import HttpClient from "./HttpClient";
import signUp_pic from "../assets/signUp_pic.png";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const registerUser = async () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await HttpClient.post("//localhost:5000/register", {
        name: `${firstName} ${lastName}`,
        email,
        password,
      });

      alert("Registration successful. Please log in.");
      window.location.href = "/login"; // Redirect to login page
    } catch (err) {
      console.error("Error during registration:", err);
      setError("An error occurred during registration. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <div className="sign-up-modal">
      <div className="left-image-section">
        <img src={signUp_pic} alt="Welcome" className="left-image" />
        <div className="join-text">Join Today</div>
      </div>
      <div className="sign-up-form">
        <h2>Sign Up</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="form-field">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Re-enter Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="terms">
            <input type="checkbox" required />
            <label>
              I have read and agree to the terms of service and privacy policy.
            </label>
          </div>
          <button className="sign-up-button" type="submit">
            Sign Up
          </button>
        </form>
        <div className="or">Or</div>
        <div className="social-sign-up">
          <button className="google-button">
            <img src="https://placeholder.pics/svg/24x24" alt="Google" />
            Sign Up with Google
          </button>
          <button className="facebook-button">
            <img src="https://placeholder.pics/svg/24x24" alt="Facebook" />
            Sign Up with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
