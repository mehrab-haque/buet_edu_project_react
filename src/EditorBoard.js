import React, { Component} from 'react';
import Konva from 'konva';
import './EditorBoard.css';

class EditorBoard extends Component {

  parseColor=(string)=>{
    var color='#'+string.substr(2,6)
    console.log(string+ " "+color)
    return color
  }

  updateDimensions = () => {
    var width=0;
    if(window.innerWidth<=768)
      width=window.innerWidth-35
    else
      width=(window.innerWidth/2)-10
    var height=width+50;
    this.setState({
      width:width,
      height:height
    })
    this.updateUi()
  };

  updateUi=()=>{
    const stage = new Konva.Stage({
      container: 'container',
      width: this.state.width,
      height: this.state.height
    });
    const layer = new Konva.Layer();
    stage.add(layer);

    var mainGroup=new Konva.Group()

    var graphGroup=new Konva.Group({
      draggable : true
    })


    var divSize=this.state.width/(Math.max(this.state.maxX-this.state.minX,this.state.maxY-this.state.minY)+2);

    var bgRect=new Konva.Rect({
      width:divSize*50,
      height:divSize*50,
      fill:this.parseColor(this.props.data.prob_schema.bgColor)
    })

    graphGroup.add(bgRect)

    for(var i=0;i<=50;i++){
      var lineV=new Konva.Line({
        points:[i*divSize,0,i*divSize,50*divSize],
        stroke:this.parseColor(this.props.data.prob_schema.lineColor),
        strokeWidth:1,
        opacity:this.props.data.prob_schema.lineOpacity
      })
      var lineH=new Konva.Line({
        points:[0,i*divSize,50*divSize,i*divSize],
        stroke:this.parseColor(this.props.data.prob_schema.lineColor),
        strokeWidth:1,
        opacity:this.props.data.prob_schema.lineOpacity
      })

      graphGroup.add(lineV)
      graphGroup.add(lineH)
    }


    var panRect=new Konva.Rect({
      width:this.state.width,
      height:50,
      fill:"#00dd44",
      y:this.state.width
    })
    var panGroup=new Konva.Group()
    panGroup.add(panRect)


    for(var i=0;i<this.props.data.prob_schema.elements.length;i++){
      var element=this.props.data.prob_schema.elements[i]
      if(element.type=="coin"){
        var coin=new Konva.Circle({
          x:element.indX*divSize,
          y:element.indY*divSize,
          radius:divSize/2,
          fill:"#0090ff",
          opacity:0.8,
          draggable:true
        });
        coin.on('mouseover', function () {
            document.body.style.cursor = 'pointer';
        });
        coin.on('mouseout', function () {
            document.body.style.cursor = 'default';
        });
        graphGroup.add(coin)
      }else if(element.type=="matchStick"){
        var line=new Konva.Line({
          points:[element.indHeadX*divSize,element.indHeadY*divSize,element.indTailX*divSize,element.indTailY*divSize],
          stroke:'#0090ff',
          strokeWidth:12,
          draggable:true
        })
        graphGroup.add(line)
      }
    }

    graphGroup.setAttrs({
      x:-(this.state.minX-1)*divSize,
      y:-(this.state.minY-1)*divSize
    })

    mainGroup.add(graphGroup)
    mainGroup.add(panGroup)
    layer.add(mainGroup)

    layer.draw()
  }

  constructor(props) {
    super(props);
    this.conRef=React.createRef();
    var width=0;
    if(this.props.width<=768)width=this.props.width-35;
    else width=(this.props.width/2)-10;
    var height=width+50;
    this.state={
      width:width,
      height:height,
      minX:this.minX(),
      maxX:this.maxX(),
      minY:this.minY(),
      maxY:this.maxY()
    }
  }

  minX=()=>{
    var minX=100;
    for(var i=0;i<this.props.data.prob_schema.elements.length;i++){
      var element=this.props.data.prob_schema.elements[i];
      if(element.type=="coin"){
        if(element.indX<minX)minX=element.indX;
      }else if(element.type=="matchStick"){
        if(element.indHeadX<minX)minX=element.indHeadX;
        if(element.indTailX<minX)minX=element.indTailX;
      }
    }
    return minX;
  }

  maxX=()=>{
    var maxX=-1;
    for(var i=0;i<this.props.data.prob_schema.elements.length;i++){
      var element=this.props.data.prob_schema.elements[i];
      if(element.type=="coin"){
        if(element.indX>maxX)maxX=element.indX;
      }else if(element.type=="matchStick"){
        if(element.indHeadX>maxX)maxX=element.indHeadX;
        if(element.indTailX>maxX)maxX=element.indTailX;
      }
    }
    return maxX;
  }

  minY=()=>{
    var minY=100;
    for(var i=0;i<this.props.data.prob_schema.elements.length;i++){
      var element=this.props.data.prob_schema.elements[i];
      if(element.type=="coin"){
        if(element.indY<minY)minY=element.indY;
      }else if(element.type=="matchStick"){
        if(element.indHeadY<minY)minY=element.indHeadY;
        if(element.indTailY<minY)minY=element.indTailY;
      }
    }
    return minY;
  }

  maxY=()=>{
    var maxY=-1;
    for(var i=0;i<this.props.data.prob_schema.elements.length;i++){
      var element=this.props.data.prob_schema.elements[i];
      if(element.type=="coin"){
        if(element.indY>maxY)maxY=element.indY;
      }else if(element.type=="matchStick"){
        if(element.indHeadY>maxY)maxY=element.indHeadY;
        if(element.indTailY>maxY)maxY=element.indTailY;
      }
    }
    return maxY;
  }

  componentDidMount(){
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions);
  }

  render() {
    return(
      <div style={{height: this.state.height}} className='board' id="container">
      </div>
    )
  }
}


export default EditorBoard;
