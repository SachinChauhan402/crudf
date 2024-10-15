import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const getSingleUser = async () => {
    const response = await fetch(`https://crud-rc76.onrender.com/${id}`);
    const result = await response.json();
    console.log("response data is coming :", result);

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      setError("");
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  };

  useEffect(() => {
    getSingleUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // No dependencies here, effectively calling getSingleUser only on mount

  // Save updated data 
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age };

    try {
      const response = await fetch(`https://crud-rc76.onrender.com/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedUser),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setError("");
        navigate("/all");
        console.log('User updated successfully:', result);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='container my-2'>
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className='text-center'>Edit the Data</h2>
      <form onSubmit={handleUpdate}>
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
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
