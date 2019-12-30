import React from "react";
import reactCSS from 'reactcss';
import TakeTblParent from './TakeTblParent';

class Toolbox extends TakeTblParent{
  constructor(props,context){
    super(props)
  }
  handleDragStart = (ev) =>{
    if (this.props.drag){
      this.props.drag(ev)
    }
  }
  render(){
    const styles = reactCSS({
      'default': {
        swatch: {
          display:"inline-block"
        },
      }
    });
    const headers = {
       'en':{
         "Section":"Section",
         "Type":"Table Types",
         "Title":{
                    "round":"round table",
                    "roundlocked": "round table locked",
                    "square":"square table ",
                    "squarelocked":"square table locked",
                    "rectangle":"rectangle table",
                    "rectanglelocked":"rectangle table locked",
                    "oval":"oval table",
                    "ovallocked":"oval table locked"
                 }
       },
       "ru":{
         "Section":"Раздел",
         "Type":"Стол модель",
         "Title":{
                    "round":"круг Стол",
                    "roundlocked": "круг Стол заблокированный",
                    "square":"квадратичный Стол ",
                    "squarelocked":"квадратичный Стол заблокированный",
                    "rectangle":"прямоугольник Стол",
                    "rectanglelocked":"прямоугольник Стол заблокированный",
                    "oval":"овал Стол",
                    "ovallocked":"овал Стол заблокированный"
                 }
       },
       "be":{
         "Section":"Раздел",
         "Type":"Стол модель",
         "Title":{
                    "round":"круг Стол",
                    "roundlocked": "круг Стол заблокированный",
                    "square":"квадратичный Стол ",
                    "squarelocked":"квадратичный Стол заблокированный",
                    "rectangle":"прямоугольник Стол",
                    "rectanglelocked":"прямоугольник Стол заблокированный",
                    "oval":"овал Стол",
                    "ovallocked":"овал Стол заблокированный"
                 }
       }
    };
    let lang=this.state.lang;
    return (
      <ul>
      <li className="toolboxitem">
         {headers[lang].Section}
      </li>

      <li id="toolsection" className="toolboxitem" data-toggle="tooltip" title="Select your floor plan settings">
        <i className="fas fa-columns iconsection" title="section" onDragStart={this.handleDragStart} id="section" type="section" draggable="true"></i>
      </li>


      <li className="toolboxitem">
          {headers[lang].Type}
      </li>
      <li className="toolboxitem" style={styles.swatch}>

          <span className="fa-stack fa-1x itable" title={headers[lang].Title.round} onClick={this.handleClick}   onDragStart={this.handleDragStart} id="stablecirlce" type="tbl" draggable="true">
            <i className="fa fa-circle itable smallfont fa-stack-2x" id="tablecirlce" ></i>
            <strong className="fa-stack-1x">T</strong>
          </span>
          <span className="fa-stack fa-1x itable" title={headers[lang].Title.roundlocked} onClick={this.handleClick} onTouchMove={this.handleDragStart}  onDragStart={this.handleDragStart} id="stablelockedcircle" type="tbl" draggable="true">
            <i className="fa fa-circle itable smallfont fa-stack-2x locked" id="tablelockedcirlce" ></i>
            <strong className="fa-stack-1x"></strong>
          </span>
          <span className="fa-stack fa-1x itable" title={headers[lang].Title.square} onClick={this.handleClick} onTouchMove={this.handleDragStart}  onDragStart={this.handleDragStart} id="stablesquare" type="tbl" draggable="true">
            <i className="fa fa-square itable smallfont fa-stack-2x" id="tablesquare" ></i>
            <strong className="fa-stack-1x">T</strong>
          </span>
          <span className="fa-stack fa-1x itable" title={headers[lang].Title.squarelocked} onClick={this.handleClick} onTouchMove={this.handleDragStart}  onDragStart={this.handleDragStart} id="stablelockedsquare" type="tbl" draggable="true">
            <i className="fa fa-square itable smallfont fa-stack-2x locked" id="tablelockedsquare" ></i>
            <strong className="fa-stack-1x"></strong>
          </span>
          <span className="fa-stack fa-1x itable" title={headers[lang].Title.rectangle} onClick={this.handleClick} onTouchMove={this.handleDragStart}  onDragStart={this.handleDragStart} id="stablerectangle" type="tbl" draggable="true">
            <div className="rectangle itable smallfont" id="tablerectangle">
              <strong className="fa-stack-1x"></strong>
            </div>
          </span>
          <span className="fa-stack fa-1x itable " title={headers[lang].Title.locked} onClick={this.handleClick} onTouchMove={this.handleDragStart}  onDragStart={this.handleDragStart} id="stablelockedrectangle" type="tbl" draggable="true">
            <div className="rectangle rectanglocked smallfont" id="tablelockedrectangle">
              <strong className="fa-stack-1x"></strong>
            </div>
          </span>
          <span className="fa-stack fa-1x itable " title={headers[lang].Title.oval} onClick={this.handleClick} onTouchMove={this.handleDragStart}  onDragStart={this.handleDragStart} id="stableoval" type="tbl" draggable="true">
            <div className="oval smallfont" id="tableoval">
              <strong className="fa-stack-1x"></strong>
            </div>
          </span>
          <span className="fa-stack fa-1x itable " title={headers[lang].Title.ovallocked} onClick={this.handleClick} onTouchMove={this.handleDragStart}  onDragStart={this.handleDragStart} id="stableovallocked" type="tbl" draggable="true">
            <div className="oval rectanglocked smallfont" id="tablelockedoval">
              <strong className="fa-stack-1x"></strong>
            </div>
          </span>

      </li>
    </ul>
    );
  }
}
export default Toolbox
