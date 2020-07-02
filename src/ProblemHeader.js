import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom'

import './problem_header.css';

var link='/'

function ProblemHeader() {

    return (
      <Link to={link} style={{ textDecoration: 'none' }}>
        <div className="header">
          <img src={require('./assets/home.png')}/>
        </div>
      </Link>
    );
}


export default ProblemHeader;
