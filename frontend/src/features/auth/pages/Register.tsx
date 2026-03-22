import {useState} from 'react'
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import "../auth.form.scss";

const Register = () => {
    //using the useState for 2 way data binding 
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword]=useState("");

    const {loading,handleRegister}=useAuth();
    const navigate=useNavigate();


    const handleSubmit=async(e:any)=>{
        e.prevent.default(); //prevents the default submit behaviour of the form
        await handleRegister({username,email,password});
        navigate("/");
    }

    if(loading){
        return(<main><h1>Loading....</h1></main>)
    }

  return (
    <main>
        <div className='form-container'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label htmlFor='username'>Username</label>
                    <input 
                    onChange={(e)=>{setUsername(e.target.value)}}
                    id='username' name='username' type='text' placeholder='Enter your Username'/>
                </div>
                <div className='input-group'>
                    <label htmlFor='email'>email</label>
                    <input
                    onChange={(e)=>{setEmail(e.target.value)}}
                    id='email' name='email' type='text' placeholder='enter your email'/>
                </div>
                <div className='input-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                    onChange={(e)=>{setPassword(e.target.value)}}
                    id='password' name='password' type='password' placeholder='enter your password'/>
                </div>
                <button className='button primary-button'>Register</button>
            </form>
        </div>
    </main>
  )
}

export default Register
