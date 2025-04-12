import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { loginUser } = useAuthContext();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const result = await loginUser(form);
    if (result.errors || result.error) {
      setErrors(result.errors || [{ msg: result.error }]);
    } else {
      navigate('/dashboard');
    }
  };
    
  return (
    <form onSubmit={onSubmit}>
      {['email','password'].map(field => (
        <div key={field}>
          <label>{field}</label>
          <input
            name={field}
            type={field==='password'?'password':'text'}
            value={form[field]}
            onChange={onChange}
          />
          {errors
            .filter(err => err.param === field || !err.param)
            .map((err,i) => <small key={i}>{err.msg}</small>)}
        </div>
      ))}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;