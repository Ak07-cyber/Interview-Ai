import { useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router';
import "../auth.form.scss";
import LoadingSpinner from '../../LoadingSpinner';

const Register = () => {
    //using the useState for 2 way data binding 
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword]=useState("");
    const [error, setError] = useState("");

    const {loading,handleRegister}=useAuth();
    const navigate=useNavigate();


    const handleSubmit=async(e: React.FormEvent)=>{
        e.preventDefault();
        setError("");

        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        const result = await handleRegister({username,email,password});
        if (result.success) {
            navigate("/");
        } else {
            setError(result.error || "Registration failed. Please try again.");
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
            <h1>Create Account</h1>
            <p className='form-subtitle'>Get started with AI-powered interview preparation.</p>
            {error && <p className="error-message">{error}</p>}
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label htmlFor='reg-username'>Username</label>
                    <input 
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value)}}
                    id='reg-username' name='username' type='text' placeholder='johndoe'/>
                </div>
                <div className='input-group'>
                    <label htmlFor='reg-email'>Email</label>
                    <input
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    id='reg-email' name='email' type='email' placeholder='you@example.com'/>
                </div>
                <div className='input-group'>
                    <label htmlFor='reg-password'>Password</label>
                    <input
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    id='reg-password' name='password' type='password' placeholder='Min 8 characters'/>
                    {password.length > 0 && (
                        <div className="password-strength">
                            <div className={`password-strength__bar ${
                                password.length >= 12 ? 'password-strength__bar--strong' :
                                password.length >= 8 ? 'password-strength__bar--good' :
                                'password-strength__bar--weak'
                            }`} style={{ width: `${Math.min(100, (password.length / 12) * 100)}%` }} />
                        </div>
                    )}
                </div>
                <button className='button primary-button' type='submit' style={{ width: '100%', marginTop: '0.5rem' }}>Create Account</button>
            </form>
            <p className='form-link'>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
    </main>
  )
}

export default Register
