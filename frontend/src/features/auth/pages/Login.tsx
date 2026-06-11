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
    <main className="auth-page">
        <div className="auth-page__orbs">
            <div className="auth-page__orb auth-page__orb--1" />
            <div className="auth-page__orb auth-page__orb--2" />
            <div className="auth-page__orb auth-page__orb--3" />
        </div>
        <div className='form-container'>
            <h1>Welcome Back</h1>
            <p className='form-subtitle'>Sign in to continue your interview prep.</p>
            {error && <p className="error-message">{error}</p>}
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label htmlFor='login-email'>Email</label>
                    <input
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    id='login-email' name='email' type='email' placeholder='you@example.com'/>
                </div>
                <div className='input-group'>
                    <label htmlFor='login-password'>Password</label>
                    <input
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    id='login-password' name='password' type='password' placeholder='••••••••'/>
                </div>
                <button className='button primary-button' type='submit' style={{ width: '100%', marginTop: '0.5rem' }}>Sign In</button>
            </form>
            <p className='form-link'>Don't have an account? <Link to="/register">Create one</Link></p>
        </div>
    </main>
  )
}

export default Login
