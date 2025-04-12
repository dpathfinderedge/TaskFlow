import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { registerUser } = useAuthContext();
  const [ form, setForm ] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    const result = await registerUser(form);
    if (result.errors) {
      setErrors(result.errors);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {['name', 'email', 'password'].map(field => (
        <div key={field}>
          <label>{field}</label>
          <input 
            name={field}
            type={field === 'password' ? 'password' : 'text'} 
            value={form[field]}
            onChange={onChange}
          />
          {errors
            .filter(err => err.param === field)
            .map(err => <small key={err.param}>{err.msg}</small>)
          }
        </div>
      ))}
      <button type="submit">Register</button>
    </form>
  )
};

export default Register;