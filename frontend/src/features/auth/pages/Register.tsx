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
    <main>
        <div className='form-container'>
            <h1>Register</h1>
            <p className='form-subtitle'>Create your account to get started.</p>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label htmlFor='username'>Username</label>
                    <input 
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value)}}
                    id='username' name='username' type='text' placeholder='Enter your Username'/>
                </div>
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
                    id='password' name='password' type='password' placeholder='Enter your password (min 8 chars)'/>
                </div>
                <button className='button primary-button' type='submit'>Register</button>
            </form>
            <p className='form-link'>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    </main>
  )
}

export default Register
