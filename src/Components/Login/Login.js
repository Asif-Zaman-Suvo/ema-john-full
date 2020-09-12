import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn,handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

function Login() {

  const [newUser, setNewUser] = useState(false)

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework()

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = ()=>{
    handleGoogleSignIn()
    .then(res=>{
      handleResponse(res,true)
    })
  }

  const fbSignIn = ()=>{
    handleFbSignIn()
    .then(res=>{
    handleResponse(res,true)
    })

    
  }

  const signOut= ()=>{
    handleSignOut()
    .then(res=>{
     handleResponse(res,false)
    })
  }

  const handleResponse= (res,redirect) => {
    setUser(res);
    setLoggedInUser(res);

    if(redirect){
      history.replace(from)

    }

  }

  const handleBlur = (event) => {

    let isFieldValid = true;

    // console.log(event.target.name,event.target.value )

    if (event.target.name === 'email') {

      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value)

      console.log(isFieldValid)

    }

    if (event.target.name === 'password') {

      const isPasswordValid = event.target.value.length > 6;

      const passwordHasNumber = /\d{1}/.test(event.target.value)

      isFieldValid = (isPasswordValid && passwordHasNumber)

    }

    if (isFieldValid) {

      const newUserInfo = { ...user };

      newUserInfo[event.target.name] = event.target.value;

      setUser(newUserInfo)

    }



  }

  const handleSubmit = (event) => {
    

    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then(res=>{
        handleResponse(res,true)
      })

      

    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email,user.password)
      .then(res=>{
       handleResponse(res,true)
      })

      

    }

    event.preventDefault();

  }

  


  return (
    <div style={{ textAlign: 'center' }}>
      {
        user.isSignedIn ?
          <button onClick={signOut}>Sign Out</button> :
          <button onClick={googleSignIn}>Sign In</button>

      }

      <br />

      <button onClick={fbSignIn}>Sign in using Facebook</button>

      {
        user.isSignedIn && <div>

          <p>{user.name}</p>
          <p>{user.email}</p>

          <img src={user.photo} alt="" />



        </div>
      }

      <h1>Our Own Authentication System</h1>
      {/* <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}

      <br />

      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign Up</label>
      <br />

      <form onSubmit={handleSubmit}>

        {newUser && <input type="text" onBlur={handleBlur} placeholder="Your Name" name="name" id="" />}

        <br />



        <input type="text" onBlur={handleBlur} placeholder="Write your email address" name="email" id="" required />
        <br />


        <input type="password" onBlur={handleBlur} placeholder='Your password' name="password" id="" required />

        <br />
        <input type="submit" value={newUser ? 'Sign up' : 'Sign In'} />

      </form>

      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>User {newUser ? "created" : "Logged In"} Successfully</p>}


    </div>
  );
}

export default Login;