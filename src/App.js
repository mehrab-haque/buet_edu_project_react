import React,{useState} from 'react';
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



const App=()=> {
  const [problems,setProblems]=useState([]);
  const [loading,setLoading]=useState(true);



  function fetchProblems(){
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

    });
    console.log(problems)
  }

  return (
    <Router>
      <Switch>
        <Route path="/"  exact  render={() => {
          if(loading){
            fetchProblems()
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
            )
          }else{
            return(
              <div>
                <AppHeader/>
                <div className="App">
                  {problems.map(problem=>(
                    <ProblemCard data={problem}/>
                  ))}
                </div>
              </div>
            )
          }
        }}/>
        <Route path="/problem" component={Problem} exact/>
      </Switch>
    </Router>
  );

}

export default App;
