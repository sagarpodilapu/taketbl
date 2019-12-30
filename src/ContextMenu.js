import React from 'react'
import { render } from 'react-dom'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import TakeTblParent from './TakeTblParent';
import reactCSS from 'reactcss';
//import './styles/react-contextmenu.css'
//import './styles/custom.css'

class TakeTblContextMenu extends TakeTblParent{
  constructor(props){
      super(props);
      console.log(this.props.seleteditem);
  }

handleKeyDown = (event) => {
  if (event.keyCode===189||event.keyCode===69||event.keyCode===190){
    event.preventDefault();
    return false;
  }
}

render (){
  const styles = {
    textAlign: 'center',
    backgroundColor: '#CCC',
    padding: 30,

  }
  const styles1 = reactCSS({
    'default': {
      swatch: {
       position: "absolute",
       top: "204px",
       left: "-33.0104px",
       border: "2px solid black",
       zIndex:11010
     },
     super:{
       zIndex:11011
     }
    }
  });
  const ID = 'ID'

  const handleClick = (event, data) => {
    console.log("save clicked")
  }


  const attributes = {
    className: 'custom-root',
    disabledClassName: 'custom-disabled',
    dividerClassName: 'custom-divider',
    selectedClassName: 'custom-selected'
  }
  const headers = {
     'en':{
       "Table":"Table",
       "tableno":"table no",
       "seats":"seats",
       "section":"section",
       "Cancel":"Cancel",
       "Ok":"Ok"
     },
     'ru':{
       "Table":"стол",
       "tableno":"стол №",
       "seats":"место",
       "section":"секция",
       "Cancel":"Отмена",
       "Ok":"Хорошо"
     },
     'be':{
       "Table":"стол",
       "tableno":"стол №",
       "seats":"место",
       "section":"секция",
       "Cancel":"Отмена",
       "Ok":"Хорошо"
     }

  };
  let lang = this.state.lang
  let contextmenu=this.props.selecteditem;

  if(!contextmenu){
     contextmenu=[]
  }

  return (

              <div>
                <ContextMenuTrigger id={ID} >
                 <div id="section45" className="section"  style={styles1.swatch} selected="true"></div>
                </ContextMenuTrigger>
                <ContextMenu id={ID}>

                  <div className="dropdown" style={styles1.super}>
                   <button view="popup" className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {headers[lang].Table}
                  </button>

                   <div className="dropdown-menu" aria-labelledby="dropdownMenu2" view="popup">
                    <form className="px-4 py-3" view="popup">
                      <div view="popup" className="form-group form-group-sm">
                          <div view="popup" className="input-group input-group-sm mb-3">
                           <div view="popup" className="input-group-prepend">
                             <span view="popup" className="input-group-text" id="basic-addon1"><i className="far fa-question-circle itable smallfont"></i></span>
                           </div>
                           <input  view="popup" name="tableno" type="number"  required={true} className="form-control" size="6"  onKeyDown={(e) => this.handleKeyDown(e)} placeholder={headers[lang].tableno}   maxLength="3" min="1" max="99" aria-describedby="basic-addon1"/>
                         </div>
                     </div>
                     <div view="popup" className="form-group form-group-sm">
                         <div view="popup" className="input-group input-group-sm mb-3">
                          <div view="popup" className="input-group-prepend">
                            <span view="popup" className="input-group-text" id="basic-addon1"><i className="fas fa-chair itable smallfont" ></i></span>
                          </div>
                          <input  view="popup" name="seats" required={true} type="number" className="form-control" size="6"   placeholder={headers[lang].seats} onKeyDown={this.handleKeyDown} maxLength="3" min="1" max="99" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div view="popup" className="form-group form-group-sm">
                        <div view="popup" className="input-group input-group-sm mb-3">
                         <div view="popup" className="input-group-prepend">
                           <span view="popup" className="input-group-text" id="basic-addon1"><i className="fas fa-columns itable smallfont" ></i></span>
                         </div>
                         <input  view="popup" name="name"  type="text" className="form-control" size="6" readOnly={true} placeholder={headers[lang].section}  maxLength="3" aria-describedby="basic-addon1" />
                       </div>
                   </div>
                   <div className="btn-group mr-3" role="group" aria-label="tablesave">
                      <MenuItem className="btn btn-cancel mr-1 btn-sm" data={{ action: 'cancel' }} onClick={handleClick}>{headers[lang].Cancel}</MenuItem><MenuItem  className="btn btn-primary btn-sm" style={styles.right}  data={{ action: 'save' }} onClick={handleClick}>{headers[lang].Ok}</MenuItem>
                   </div>
                   </form>
                  </div>
                 </div>


        </ContextMenu>

      </div>

      );

 }
}
export default TakeTblContextMenu
