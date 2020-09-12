import React, { useState, useContext } from 'react';

import * as firebase from 'firebase/app';


import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


firebase.initializeApp(firebaseConfig)


function Login() {

  const [newUser,setNewUser] =useState(false)

const[user,setUser]=useState({
  isSignedIn:false,
  name:'',
  email:'',
  password:'',
  photo:''
});

const [loggedInUser,setLoggedInUser]=useContext(UserContext);

const history=useHistory();
const location=useLocation();

let { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();

  var fbProvider = new firebase.auth.FacebookAuthProvider();

 

  const handleSignIn=()=>{
    firebase.auth().signInWithPopup(provider)
    .then(res=>{

      const {displayName,photoURL,email}=res.user;

      const signedInUser={
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL

      }


      setUser(signedInUser);

      console.log(displayName,photoURL,email);

    })

    .catch(err=>{
      console.log(err);
      console.log(err.message);
    })
      

  }

  const handleFbLogIn=()=>{
    firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  const handleSignOut=()=>{

  firebase.auth().signOut()

  .then(res=>{
    const signedOutUser={
      isSignedIn:false,
      name:'',
      email:'',
      photo:'',
      error:'',
      success:'',
      newUser:false
    }

    setUser(signedOutUser);
    console.log(res)
  })

  .catch(err =>{

  })
  }

  const handleBlur =(event)=>{

    let isFieldValid=true;

    // console.log(event.target.name,event.target.value )

    if(event.target.name  ==='email'){

       isFieldValid=/\S+@\S+\.\S+/.test(event.target.value)

      console.log(isFieldValid)

    }

    if(event.target.name === 'password'){

      const isPasswordValid=event.target.value.length >6;

      const passwordHasNumber=/\d{1}/.test(event.target.value)

      isFieldValid=(isPasswordValid && passwordHasNumber)

    }

    if(isFieldValid){

      const newUserInfo={...user};

      newUserInfo[event.target.name]=event.target.value;

      setUser(newUserInfo)

    }
    


  }

  const handleSubmit=(event)=>{
    // console.log(user.email,user.password)

    if(newUser&&user.email && user.password){

      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)

      .then(res=>{

        const newUserInfo={...user};
        newUserInfo.error='';

        newUserInfo.success=true;
        setUser(newUserInfo)
        console.log(res)
      })
      .catch(error=> {
        // Handle Errors here.

        const newUserInfo={...user};
        newUserInfo.error=error.message;
        newUserInfo.success=false;
        setUser(newUserInfo);
        updateUserName(user.name);


        // var errorCode = error.code;
        // var errorMessage = error.message;

        // console.log(errorCode,errorMessage)
         
      });

    }
        if(!newUser&& user.email&& user.password){

          firebase.auth().signInWithEmailAndPassword(user.email, user.password)

          .then(res=>{
          const newUserInfo={...user};
          newUserInfo.error='';

          newUserInfo.success=true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log("sign in user info",res.user)
          })
          
          .catch(error=> {
            // Handle Errors here.
            const newUserInfo={...user};
            newUserInfo.error=error.message;
            newUserInfo.success=false;
            setUser(newUserInfo)
          });

        }

    event.preventDefault();

  }

  const updateUserName=name =>{

    const user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: name,
       
      }).then(function() {
        console.log('user name updated successfully')
      }).catch(function(error) {
        console.log(error)
      });

  }


  return (
    <div style={{textAlign: 'center'}}>
        {
          user.isSignedIn ?
          <button onClick={handleSignOut}>Sign Out</button> :
          <button onClick={handleSignIn}>Sign In</button> 
        
        }

        <br/>

        <button onClick={handleFbLogIn}>Sign in using Facebook</button>
      
      {
        user.isSignedIn && <div>

          <p>{user.name}</p>
          <p>{user.email}</p>

          <img src={user.photo} alt=""/>

          
          
          </div>
      }

      <h1>Our Own Authentication System</h1>
      {/* <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}

      <br/>

      <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign Up</label>
      <br/>

     <form onSubmit={handleSubmit}>

       {newUser && <input type="text" onBlur={handleBlur} placeholder="Your Name" name="name" id=""/>}

       <br/>
      


     <input type="text" onBlur={handleBlur} placeholder="Write your email address" name="email" id="" required/>
      <br/>


      <input type="password" onBlur={handleBlur} placeholder='Your password' name="password" id="" required/>

      <br/>
      <input type="submit" value={newUser? 'Sign up':'Sign In'}/>

     </form>

     <p style={{color:'red'}}>{user.error}</p>
     {user.success && <p style={{color:'green'}}>User {newUser ? "created" :"Logged In" } Successfully</p> }

      
    </div>
  );
}

export default Login;