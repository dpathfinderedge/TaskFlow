import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, EyeIcon, EyeOffIcon } from 'lucide-react';

const Register = () => {
  const { registerUser, loadUser } = useAuthContext();
  const navigate = useNavigate();

  const [ form, setForm ] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); 
    setLoading(true);

    const result = await registerUser(form);
    setLoading(false);
    // console.log(result);

    if (result.errors) {
      const parsed = {};
      result.errors?.forEach((err) => {
        const key = Object.keys(err)[0];
        parsed[key] = err[key];
      });
      setErrors(parsed);
      console.log(errors);
    } else {
      await loadUser();
      navigate('/dashboard');
    }
  };

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="flex items-center space-x-2 mb-6 md:self-start">
        <span className="text-blue-400 text-2xl">
          <CheckCircle size={28} />
        </span>
        <h1 className="text-2xl font-bold text-white">TaskFlow</h1>
      </div>
      
      <div className="w-full max-w-md p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">Create your account</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm text-zinc-400">Full Name</label>
            <input 
              onChange={handleChange} 
              type="text" 
              id="name" 
              value={form.name} 
              required 
              placeholder="Enter your full name" 
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" 
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-zinc-400">Email</label>
            <input 
              onChange={handleChange} 
              type="email" 
              id="email" 
              value={form.email}
              required 
              placeholder="Enter your email address" 
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" 
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm text-zinc-400">Password</label>
            <div className="flex justify-between items-center w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500">
              <input 
                onChange={handleChange} 
                type={showPassword ? 'text' : 'password'} 
                id="password" 
                value={form.password} 
                required 
                placeholder="Create a password" 
                className="w-full bg-inherit text-white placeholder:text-zinc-500 focus:outline-none" 
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-white ml-2"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="mt-2 w-full bg-white text-black py-2 rounded-lg font-medium hover:bg-white/90 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900 px-2 text-zinc-500">OR</span>
            </div>
          </div>

          <div className="mt-2">
            <button 
              type="button" 
              className="w-full flex items-center justify-center gap-3 px-3 py-2 border border-zinc-700 rounded-lg text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github h-4 w-4">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
              Continue with GitHub
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-500">
          By creating an account, you agree to our{' '}
          <a className="text-white hover:text-blue-500" href="/terms">Terms of Service</a>{' '} 
          and <a className="text-white hover:text-blue-500" href="/privacy">Privacy Policy</a>
        </p>
        <p className="mt-4 text-center text-sm text-zinc-500">
          Already have an account?{' '} 
          <a className="text-white hover:text-blue-500" href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;