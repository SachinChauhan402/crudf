import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'; // Ensure styles.css includes the background settings
import backgroundImage from './assets/background.jpg';


const Create = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addUser = { name, email, age };

    try {
      const response = await fetch('https://crud-rc76.onrender.com', {
        method: 'POST',
        body: JSON.stringify(addUser),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        setSuccess("");
        setError(result.error);
      } else {
        setError("");
        setSuccess("User added successfully!");
        setName("");
        setEmail("");
        setAge(0);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container my-5" style={{backgroundImage :`url(${backgroundImage})`, backgroundSize: 'contain'}}> 
      <div className="row justify-content-center">
        <div className="col-md-6 ">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="text-center mb-4 text-primary">Create New User</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
