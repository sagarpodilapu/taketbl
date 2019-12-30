import React from "react";
import reactCSS from 'reactcss';
import TakeTblParent from './TakeTblParent';
class FloorPlanInfo extends TakeTblParent {
  constructor(props){
      super(props);
  }
  handleData = () => {
    console.log("Handling data");
  }
  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
    console.log("Component Updated",this.state.tableinfo);
    if (this.props.userID !== prevProps.userID) {
     this.fetchData(this.props.userID);
    }
  }

render(){
  const headers = {
     'en':{
       "Type":"Type",
       "InfoHeader":"FloorPlan Info",
       "TableNo":"Phone No",
       "Seats":"Seats",
       "Section":"Section",
       "Color":"Color"
     },
     "ru":{
       "Type":'Тип',
       "InfoHeader":"Пол План детали",
       "TableNo":"Таблица №",
       "Seats":"места",
       "Section":"Раздел",
       "Color":"цвет"
     },
     "be":{
       "Type":'Тип',
       "InfoHeader":"Пол План детали",
       "TableNo":"Таблица №",
       "Seats":"места",
       "Section":"Раздел",
       "Color":"цвет"
     }
   };
   const styles = reactCSS({
     'default': {
       swatch: {
         backgroundColor:"grey",
       },
     }
   });
   let lang = this.state.lang;
   //lang ='en';
   return(
     <table width="100%" className="table table-sm">
      <tbody>
       <tr><td colSpan="2" style={styles.swatch}> {headers[lang].InfoHeader}  </td></tr>
       <tr><td > {headers[lang].Type}: </td><td><span id="tbltype"></span></td></tr>
       <tr><td > {headers[lang].TableNo}: </td><td><span id="tblno"></span></td></tr>
       <tr><td > {headers[lang].Seats}: </td><td><span id="tbltoseat"></span></td></tr>
       <tr><td > {headers[lang].Section}: </td><td><span id="tblsection"></span></td></tr>
       <tr><td > {headers[lang].Color}: </td><td>  <span id="color"></span></td></tr>
      </tbody>
     </table>

   );
}

}
export default FloorPlanInfo
