import React, { Component } from 'react';

class Problem extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    console.log(this.props.location.search)
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default Problem;
