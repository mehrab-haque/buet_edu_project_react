import React, { Component} from 'react';
import './EditorBoard.css';

class EditorBoard extends Component {


  constructor(props) {
    super(props);
  }

  componentDidMount(){

  }

  render() {
    return(
      <div className='board'>
        <div className="label">
          Editor Board
        </div>
      </div>
    )
  }
}


export default EditorBoard;
