import React, { useState } from 'react';

const Create = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [error, setError] = useState("")


  // Logs form values to the console
  console.log(name, email, age);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addUser = { name, email, age };

    try {
      const response = await fetch('https://crud-rc76.onrender.com', { // Update the URL as per your backend route
        method: 'POST',
        body: JSON.stringify(addUser),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error)
      } else {
        setError("")
        setName("")
        setEmail("")
        setAge(0)
        console.log('User added successfully:', result);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='container my-2'>
      {error && <div class="alert alert-danger">
        {error}
      </div>}
      <h2 className='text-center'>Enter the Data</h2>
      <form onSubmit={handleSubmit}>
        {/* Replace onClick with onSubmit */}
        <div className='mb-3'>
          <label className='form-label'>Name</label>
          <input
            type='text'
            className='form-control'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Email Address</label>
          <input
            type='email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Age</label>
          <input
            type='number'
            className='form-control'
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
