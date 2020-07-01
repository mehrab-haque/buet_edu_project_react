import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom'
import ProgressBar from 'react-animated-progress-bar';
import ReactCardFlip from 'react-card-flip';
import './prob_card.css';

const ProblemCard=({data})=>{
const images=[
  require('./assets/cat_icons/algebra.png'),
  require('./assets/cat_icons/geometry.svg'),
  require('./assets/cat_icons/number.webp'),
  require('./assets/cat_icons/com.svg'),
  require('./assets/cat_icons/circuit.jpg'),
  require('./assets/cat_icons/graph.png'),
  require('./assets/cat_icons/english.png'),
  require('./assets/cat_icons/others.png')
]

  var link='/problem?id='+data.id

  return(
    <Link to={link} style={{ textDecoration: 'none' }}>
      <div className='prob_card'>
        <h2>{data.title}</h2>
        <img className='icon' src={images[data.category]}/>
        <p>{data.description.substr(0,60)+'...'}</p>
        <div className="progressContainer">
          <ProgressBar
            height="16px"
            rect
            fontColor="gray"
            percentage={20}
            rectPadding="1px"
            rectBorderRadius="4px"
            trackPathColor="transparent"
            bgColor="#00BFFF"
            fontColor="fontColor"
            trackBorderColor="#00BFFF"
            defColor={{
              fair: '#00BFFF',
              good: '#00BFFF',
              excellent: '#00BFFF',
              poor: '#00BFFF',
            }}
          />
        </div>

        <div className="footer">
          <div className="starDiv">
            <img src={require('./assets/star.png')}/>
            <font>{data.difficulty}</font>
          </div>

          <div className="trophyDiv">
            <img src={require('./assets/trophy.png')}/>
            <font>{5}</font>
          </div>
        </div>
        <div className="courtesy">
          <p className='author'>
            <font color="#1BA600">-by {data.author}</font>
            <font color="#e79f20"> on {timeConverter(data.timestamp)}</font>
          </p>
        </div>
      </div>
    </Link>
  );
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp );
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + '-' + month + '-' + year + ' at ' + hour + ':' + min + ':' + sec ;
  return time;
}

export default ProblemCard;
