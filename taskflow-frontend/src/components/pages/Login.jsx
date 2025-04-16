import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, EyeIcon, EyeOffIcon } from 'lucide-react';

const Login = () => {
  const { loginUser } = useAuthContext();
  const [ form, setForm ] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState([]);
  const [showKey, setShowKey] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await loginUser(form);
    console.log(result);
    if (result.errors) {
      setErrors(result.errors);
      console.log(errors);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-blue-400 text-2xl">
          <CheckCircle size={28} />
        </span>
        <h1 className="text-2xl font-bold text-white">TaskFlow</h1>
      </div>
      
      <div className="w-full max-w-md p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">Login your account</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm text-zinc-400">Email</label>
            <input onChange={onChange} type="email" id="email" name="email" required placeholder="Enter your email address" className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm text-zinc-400">Password</label>
            <div className="flex justify-between items-center w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
              <input onChange={onChange} type={showKey ? 'text' : 'password'} id="password" name="password" required placeholder="Enter your password" className="w-full bg-inherit text-white placeholder:text-zinc-500 focus:outline-none" />
              <span
                onClick={() => setShowKey(!showKey)}
                className="text-white hover:bg-transparent ml-2 w-max"
              >
                {showKey ? <EyeIcon size={20} />: <EyeOffIcon size={20} />}
              </span>
            </div>
          </div>
          {/* {errors
            .filter(err => err.param === field)
            .map(err => <small key={err.param}>{err.msg}</small>)
          } */}
          <button type="submit" className="w-full bg-white text-black py-2 rounded-lg font-medium hover:bg-white/90 transition-colors disabled:opacity-50 cursor-pointer">Login Account</button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-zinc-900 px-2 text-zinc-500">OR</span></div>
          </div>
          <div className="">
            <button type="button" className="w-full flex items-center justify-center gap-3 px-3 py-2 border border-zinc-700 rounded-lg text-white hover:bg-zinc-800 transition-colors cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github h-4 w-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>Continue with GitHub</button>
          </div>

        </form>
        
        <p className="mt-4 text-center text-sm text-zinc-500">Don't have an account? <a className="text-white hover:text-blue-500" href="/register">Sign up</a></p>
      </div>
    </div>
  )
};

export default Login;