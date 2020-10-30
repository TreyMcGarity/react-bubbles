import React, { useState } from "react";
import axios from 'axios';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState({ username: '', password: '' });

  const handleChange = event => {
    setLogin({...login, [event.target.name]: event.target.value})
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
    .post('http://localhost:5000/api/login', login)
    .then(response => {
      console.log(console.log('login response', response.data));
      localStorage.setItem('token', response.data.payload);
      props.history.push('/bubble-page')
    })
    .catch(error => {console.log('Login Error', error)
    })
  };

  return (
    <div style={{display:"flex", flexDirection: "column", alignContent:"center"}}>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input style={{width:"50%", alignSelf:"center"}}
        type='text'
        name='username'
        placeholder='username'
        value={login.username}
        onChange={handleChange}
        />
        <input style={{width:"50%", alignSelf:"center"}}
        type='password'
        name='password'
        placeholder='password'
        value={login.password}
        onChange={handleChange}
        />
        <button 
          style={{width:"50%", alignSelf:"center"}}
          type='submit'>
            Sign In
        </button>
      </form>
      <p>Hint: Write in the placeholder text for entry.</p>
    </div>
  );
};

export default Login;
