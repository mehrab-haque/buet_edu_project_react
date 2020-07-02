import React, { Component} from 'react';
import ProblemHeader from './ProblemHeader'
import EditorBoard from './EditorBoard'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import './firebase_config'
import * as firebase from 'firebase'
import './Problem.css';

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

var CATEGORIES=["Algebra","Geometry","Number Theory","Combination","Circuit","Graph Theory","English","Others"];

class Problem extends Component {

  submit=()=>{
    var verdict=""
    if(this.state.data.ans_type==2){
      if(this.ansCom.current.getAnswer()==this.state.data.answer){
        verdict="Correct Answer"
      }else{
        verdict="Wrong Answer, correct answer is "+this.state.data.options[this.state.data.answer]
      }
    }else if(this.state.data.ans_type==1){
      if(this.ansCom.current.getAnswer()===this.state.data.answer){
        verdict="Correct Answer"
      }else{
        verdict="Wrong Answer, correct answer is "+this.state.data.answer
      }
    }
    window.alert(verdict)
  }

  constructor(props) {
    super(props);
    this.ansCom=React.createRef();
    this.state={
      isLoading:true
    }
  }



  componentDidMount(){
    let currentComponent = this;
    var str_arr=this.props.location.search.split('=');
    this.id=str_arr[1]
    this.docRef=firebase.firestore().collection('problem').doc(this.id);
    this.docRef.get().then(function(doc) {
      if (doc.exists) {
          currentComponent.setState({
            isLoading:false,
            data:doc.data()
          })
      } else {
          window.alert("No such problem!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  render() {
    if(this.state.isLoading){
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
      return (
        <div>
          <ProblemHeader/>
          <div className='container'>
            <div className="title">
              <img className='icon' src={images[this.state.data.category]}/>
              <div className="titleTxt">{this.state.data.title}</div>
              <div className="tag">
                {this.state.data.series}
              </div>
              <div className="tag">
                {CATEGORIES[this.state.data.category]}
              </div>
              <div className="tag">
                Difficulty : {this.state.data.difficulty}/10
              </div>
              <div className="tag">
                -by {this.state.data.author}
              </div>
              <div className="tag">
                -on {timeConverter(this.state.data.timestamp)}
              </div>
            </div>
            <div className="des">
              <img className='des_icon' src={require('./assets/star.png')}/>
              Description : {this.state.data.description}<br/>
              {
                "des_images" in this.state.data?(
                  this.state.data.des_images.map(image=>(
                    <img className="des_img" src={image}/>
                  ))
                ):(
                  console.log('null')
                )
              }

            </div>
            <div className="main">
              <EditorBoard data={this.state.data} width={window.innerWidth}/>
              <div className="question_container">
                <div className="statement">
                  <img src={require('./assets/cat_icons/others.png')}/>
                  <font>{this.state.data.statement}</font>
                </div>
                <div className="ans">
                  {
                    this.state.data.ans_type==0?(
                      <BoardAns/>
                    ):(
                      this.state.data.ans_type==1?(
                          <TextAns ref={this.ansCom}/>
                      ):(
                        <MCQAns ref={this.ansCom} data={{
                          options:this.state.data.options,
                          answer:this.state.data.answer
                        }}/>
                      )
                    )
                  }
                </div>
                {
                  <Restriction data={this.state.data}/>
                }
                <button onClick={this.submit}  className="submit_btn">
                  Submit Answer
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
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

function BoardAns() {

    return (
      <div className='boardAns'>
        [ Generate the answer from the editor board and then click on the submit button located below]
      </div>
    );
  }

  const Restriction=({data})=> {

    if("restrictions" in data){
      return(
        <div className='restriction'>
          *Restrictions : {data.restrictions}
        </div>
      )
    }else{
      return(
        <div></div>
      )
    }
    }

  class MCQAns extends Component {


    constructor(props) {
      super(props);
      this.state={
        option:-1
      }
    }


    selectOption(event) {
        this.setState({
          option:event.target.value
        })
    }

    getAnswer(){
      return this.state.option
    }


    componentDidMount(){

    }

    render() {

      return(
        <div className='mcqAns' onChange={event => this.selectOption(event)}>

          {

            this.props.data.options.map((option,index)=>(
              <div className="mcq_option">
                <input
                className="radio_btn"
                  type="radio"
                  name="gender"
                  value={index}
                  />
                <font>{option}</font>
              </div>
            ))
          }
        </div>
      )
    }
  }


  class TextAns extends Component {


    constructor(props) {
      super(props);
      this.txtRef=React.createRef();
    }


    getAnswer(){
      return this.txtRef.current.value;
    }


    componentDidMount(){

    }

    render() {

      return(
        <div className='txtAns'>

          <input ref={this.txtRef} type="text" placeHolder="Enter answer"/>

        </div>
      )
    }
  }




export default Problem;
