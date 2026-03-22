import {useState} from 'react';
import { useNavigate } from 'react-router';
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'; //the useEffect would automatically run 


const Login = () => {
    
    const {loading,handleLogin}=useAuth();
    const navigate=useNavigate();

    //issue will cause too many rerender needs optimization useRef
    const [email, setEmail] = useState("");
    const [password,setPassword]=useState("");
    

    const handleSubmit=async(e:any)=>{
        e.prevent.default(); //prevents the default submit behaviour of the form
        await handleLogin({email,password})
        navigate("/");
    }

    if(loading){
        return (<main><h1>Loading.....</h1></main>)
    }

  return (
    <main>
        <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label htmlFor='email'>email</label>
                    <input
                    onChange={(e)=>{setEmail(e.target.value)}}
                    id='email' name='email' type='text' placeholder='enter your email'/>
                </div>
                <div className='input-group'>
                    <label htmlFor='password'>email</label>
                    <input
                    onChange={(e)=>{setPassword(e.target.value)}}
                    id='password' name='password' type='password' placeholder='enter your password'/>
                </div>
                <button className='button primary-button'>Login</button>
            </form>
        </div>
    </main>
  )
}

export default Login