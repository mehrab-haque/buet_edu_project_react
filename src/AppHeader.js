import React,{useEffect,useState} from 'react';

import './app_header.css';


function AppHeader() {

    return (
      <div className='headerDiv'>
        <h1>
          Learning
        </h1>
        <ul>
          <li>Home</li>
          <li>Poblems</li>
          <li>Login</li>
          <li>Register</li>
        </ul>
        <img className='ham' src={require('./assets/ham.png')}/>
      </div>
    );
}


export default AppHeader;
