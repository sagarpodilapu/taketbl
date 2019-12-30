
import React from 'react'
import reactCSS from 'reactcss';
import TakeTblParent from './TakeTblParent';
import ContextMenu from './ContextMenu';
import Toast from './Toast';


class Content extends TakeTblParent {
  constructor(props,context){
    super(props);
  }
  handleMouseDown = (event) => {
    console.log('mousedown',event.shiftKey);
  }

  handleClick = (event) => {
    // select event
    //this.props.select(event);
  }

  handleDrop = (event) => {
    var data = event.dataTransfer.getData("text");
    var obj =  document.getElementById(data);
    if (this.props.drop){
      this.props.drop(event);
      let selectedItem=this.props.selecteditem();
      //console.log(selectedItem);
      this.setState({selecteditem:selectedItem});
    }else{
      console.log(event.target);
    }
  }
  handleDragEnter = (event)=>{
    //dragenter(event);"
    this.props.dragenter(event);
  }
  handleDragOver = (event)=>{
    //allowDrop(event)
    this.props.allowDrop(event);
  }

  render(){
     return(
               <span>
                 <div className="content"  id="content"
                 onClick={this.handleClick}
                 onDrop={this.handleDrop}
                 onDragEnter={this.handleDragEnter}
                 onDragOver={this.handleDragOver} >
                <Toast></Toast>


                 </div>

               </span>
    );


  }
}
export default Content
