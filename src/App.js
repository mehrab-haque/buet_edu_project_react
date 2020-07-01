import React,{useEffect,useState} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import logo from './logo.svg';
import './App.css';
import './firebase_config'
import * as firebase from 'firebase'
import ProblemCard from './ProblemCard'
import AppHeader from './AppHeader'
import Problem from './Problem'

function App() {

  const [problems,setProblems]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    fetchProblems()
  },[]);

  const fetchProblems=()=>{
    var db=firebase.firestore()
    db.collection("problem")
    .onSnapshot(function(querySnapshot) {
        var problems_arr = [];
        querySnapshot.forEach(function(doc) {
            var data=doc.data();
            data['id']=doc.id;
            problems_arr.push(data);
        });
        setProblems(problems_arr)
        setLoading(false)
        console.log(loading)
    });
  }
  if(loading){
    //background-image: url('assets/app_bg.svg');
    return (
      <div className="LoaderContainer">
      <div className="LoaderBody">
      <Loader
         type="Bars"
         color="#ffffff"
         height={120}
         width={120}
            />
        </div>
      </div>
    );
  }else{
    return (
      <Router>
        <div>
          <AppHeader/>
          <Switch>
            <Route path="/" exact>
              <div className="App">
                {problems.map(problem=>(
                  <ProblemCard data={problem}/>
                ))}
              </div>
            </Route>
            <Route path="/problem" component={Problem} exact/>
          </Switch>
        </div>
      </Router>
    );
  }

}

export default App;
