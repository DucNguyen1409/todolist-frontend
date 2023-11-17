import { useState } from "react";
import { useCookies } from "react-cookie";
import { registerUserAPI } from "../api";

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null) 
  const [isLogIn, setIsLogIn] = useState(true);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const viewLogin = (status) => {
    setError(null)
    setIsLogIn(status)
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError('password not matching');
      return;
    }

    let requestData = {};
    // set data for register
    if ('register' === endpoint) {
      requestData = {
        'email': email, 
        'password': password, 
        'lastName': userName
      };
    }

    // set data for authentication
    if ('authentication' === endpoint) {
      requestData = {
        'email': email, 
        'password': password
      };
    }

    registerUserAPI(endpoint, requestData).then(response => {
      if (response.access_token) {
        setCookie('UserId', response.userId)
        setCookie('Email', response.email)
        setCookie('UserName', response.lastName)
        setCookie('AccessToken', response.access_token)
        setCookie('RefreshToken', response.refresh_token)
        window.location.reload();
      }
    })
    
  }

  return (
    <div className="auth-container">
    <div className="auth-container-box">
      <form>
        <h2>{isLogIn ? 'Please Login' : 'Please Signup'}</h2>
        <input 
          required
          placeholder="user name" 
          onChange={(e) => setUserName(e.target.value)}/>
        <input 
          required
          type="email" 
          placeholder="email" 
          onChange={(e) => setEmail(e.target.value)}/>
        <input 
          required
          type="password" 
          placeholder="password" 
          onChange={(e) => setPassword(e.target.value)}/>
        {!isLogIn 
          && <input 
                required
                type="password" 
                placeholder="confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />}
        <button 
          type="submit" 
          className="create"
          onClick={(e) => handleSubmit(e, isLogIn ? 'authentication' : 'register')}>
            Submit
        </button>
        {error && <p>{error}</p>}
      </form>
        <div className="auth-options">
          <button 
            onClick={() => viewLogin(false)}
            style={{backgroundColer: !isLogIn ? 'rgb(255,255,255)': 'rgb(188,188,188)'}}>
              SignUp
          </button>
          <button 
            onClick={() => viewLogin(true)}
            style={{backgroundColer: !isLogIn ? 'rgb(255,255,255)': 'rgb(188,188,188)'}}>
              Login
          </button>
      </div>
    </div>
  </div>
  );
}
  
export default Auth;
  