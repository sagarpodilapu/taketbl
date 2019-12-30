import React from "react";
import reactCSS from 'reactcss';
import TakeTblParent from './TakeTblParent';
class Section extends TakeTblParent{
  construction(props,context){
    super(props);
    //this.drag=this.props.drag;
    //this.dra
  }
  handleDrag = (ev) =>{
    console.log(ev)
    if (ev && ev.dataTransfer){
      ev.dataTransfer.setData("text", ev.target.id);
    }
  }
  render(){
      return( <li class="toolboxitem" data-toggle="tooltip" title="Select your floor plan settings">
                <i class="fas fa-columns iconsection" title="section" onDragStart={this.handleDrag} id="section" draggable="true"></i>
             </li>
       );
  }
}
export default Section;
