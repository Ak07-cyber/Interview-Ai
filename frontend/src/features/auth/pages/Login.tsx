import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../../LoadingSpinner';


const Login = () => {
    
    const {loading,handleLogin}=useAuth();
    const navigate=useNavigate();

    const [email, setEmail] = useState("");
    const [password,setPassword]=useState("");
    const [error, setError] = useState("");
    

    const handleSubmit=async(e: React.FormEvent)=>{
        e.preventDefault();
        setError("");
        const result = await handleLogin({email,password});
        if (result.success) {
            navigate("/");
        } else {
            setError(result.error || "Login failed. Please try again.");
        }
    }

    if(loading){
        return <LoadingSpinner />;
    }

  return (
    <main>
        <div className='form-container'>
            <h1>Login</h1>
            <p className='form-subtitle'>Welcome back! Sign in to continue.</p>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    id='email' name='email' type='email' placeholder='Enter your email'/>
                </div>
                <div className='input-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    id='password' name='password' type='password' placeholder='Enter your password'/>
                </div>
                <button className='button primary-button' type='submit'>Login</button>
            </form>
            <p className='form-link'>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    </main>
  )
}

export default Login
