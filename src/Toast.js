
import React from 'react'
import { render } from 'react-dom'
import reactCSS from 'reactcss';
import TakeTblParent from './TakeTblParent';
class Toast extends TakeTblParent{
  constructor(props){
      super(props);
  }
  handleMessage = (event) =>{
    alert("HandleMessage");
  }
  render(){
    const headers = {
       'en':{
         "mrauto":"Bootstrap",
         "textmuted":"just now",
         "toastbody":"seats",
         "close":"Close"
       },
       'ru':{
         "mrauto":"заголовок",
         "textmuted":"только что",
         "toastbody":"",
         "close":"вплотную"
       },
       'be':{
         "mrauto":"заголовок",
         "textmuted":"только что",
         "toastbody":"",
         "close":"вплотную"
       }

    };
    const styles = reactCSS({
      'default': {
        swatch: {
          position: "absolute",
          top: 0,
          right: 0,
          zIndex:11000
        }
      }
    });
    let lang = this.state.lang;
    return(
      <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" style={styles.swatch}>
      <div className="toast-header" >
        <strong className="mr-auto">{headers[lang].mrauto}</strong>
        <small className="text-muted">{headers[lang].textmuted}</small>
        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label={headers[lang].close}>
         <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="toast-body">
        {headers[lang].toastbody}
      </div>
     </div>
   );
 }
}
export default Toast
