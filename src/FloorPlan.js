import React from "react";
import reactCSS from 'reactcss';
import TakeTblParent from './TakeTblParent';

class FloorPlan extends TakeTblParent {
  constructor (props,context){
    super(props);
    this.headers = {
       'en':{
         "InfoHeader":"Floor Plan",
         "Name":"Name",
         "PlaceHolderName":"Enter floor Plan Name",
         "Description":"Description",
         "PlaceHolderDescription":"Enter Description",
         "Default":"Default",
         "Published":"Published",
         "Weekdays":"Weekdays",
         "StartDate":"Start Date",
         "EndDate":"End Date",
         "Sun":"Sun",
         "Mon":"Mon",
         "Tue":"Tue",
         "Wed":"Wed",
         "Thu":"Thu",
         "Fri":"Fri",
         "Sat":"Sat",
         "Cancel":"Close",
         "Save":"Save",
         "message":{
            "Heading":"Floor Plan",

          }
         },
       "ru":{
         "InfoHeader":"План зала",
         "Name":"название",
         "PlaceHolderName":"вводить Пол План название",
         "Description":"Описание",
         "PlaceHolderDescription":"вводить Описание",
         "Default":"умолчание",
         "Published":"изданный",
         "Weekdays":"будни",
         "StartDate":"начало дата",
         "EndDate":"конец дата",
         "Sun":"Вс",
         "Mon":"Пн",
         "Tue":"Вт",
         "Wed":"Ср",
         "Thu":"Чт",
         "Fri":"Пт",
         "Sat":"Сб",
         "Cancel":"близко",
         "Save":"Сохранить",
         "message":{
            "Heading":"План зала",

          }
       },
       "be":{
         "InfoHeader":"План зала",
         "Name":"название",
         "PlaceHolderName":"вводить Пол План название",
         "Description":"Описание",
         "PlaceHolderDescription":"вводить Описание",
         "Default":"умолчание",
         "Published":"изданный",
         "Weekdays":"будни",
         "StartDate":"начало дата",
         "EndDate":"конец дата",
         "Sun":"Вс",
         "Mon":"Пн",
         "Tue":"Вт",
         "Wed":"Ср",
         "Thu":"Чт",
         "Fri":"Пт",
         "Sat":"Сб",
         "Cancel":"близко",
         "Save":"Сохранить",
         "message":{
            "Heading":"План зала",

          }
       }
     }
  }
  saveFloorPlan = (event) => {
    let lang = this.state.lang;
    let msg=this.headers[lang].message;
    console.log(msg)
    this.props.saveFloorPlan(msg);
  }
  handleUpdateDefault=(event)=>{
    if (event.target.type==="checkbox"){
        this.props.setDefault(event.target.checked);
    }
  }
  handleKeyDown = (event) => {

   if (event && event.keyCode && (event.keyCode===188||event.keyCode===190)){
     event.preventDefault();
     return false;
   }
  }

  handleUpdateWeekday = (event) =>{
    if(event.target.type==="checkbox"){
      this.props.setWeekday();
    }
  }

render(){

  const styles = reactCSS({
    'default': {
      swatch: {
        backgroundColor:"grey",
      },
      size :{
        width:"150px",
      }
    }
  });
  let lang = this.state.lang;
  let headers = this.headers;
  return (
      <table width="100%" className="table table-sm">
      <tbody>
          <tr><td colSpan="2"></td></tr>
         <tr><td colSpan="2" style={styles.swatch}>{headers[lang].InfoHeader}</td></tr>
         <tr><td colSpan="2"> <label htmlFor="floorplanname">{headers[lang].Name}:</label>
           <input type="text" name="fpnname" style={styles.size} className="form-control form-control-sm" id="floorplanname" aria-describedby="floorplanname" placeholder={headers[lang].PlaceHolderName} /></td></tr>
        <tr><td colSpan="2"> <label htmlFor="description">{headers[lang].Description}:</label>
        <textarea className="form-control form-control-sm" id="description" name="fpdescription" placeholder={headers[lang].PlaceHolderDescription}  onKeyDown={this.handleKeyDown} aria-label="With textarea" maxLength="100"></textarea></td></tr>
        <tr ><td nowrap="true">
          <label htmlFor="default">

            <input  type="checkbox" id="default" onChange={this.handleUpdateDefault} name="fpdefault"/>{headers[lang].Default}</label></td><td><label  htmlFor="published"><input type="checkbox"  id="published" name="fppublished"/>{headers[lang].Published}</label></td></tr>
            <tr ><td colSpan="2"> <label htmlFor="weekdays">{headers[lang].Weekdays}:
              <table width="100%">
               <tbody className="weekdays">
                 <tr width="100%">
                  <td nowrap="true"><label htmlFor="sun"><input onChange={this.handleUpdateWeekday}  type="checkbox" id="sun" name="sun"/>{headers[lang].Sun}</label></td><td nowrap="true"><label  htmlFor="mon"><input  onChange={this.handleUpdateWeekday} type="checkbox"  id="mon" name="mon" />{headers[lang].Mon}</label></td>
                  <td nowrap="true"><label htmlFor="tue"><input  onChange={this.handleUpdateWeekday} type="checkbox" id="tue" name="tue"/>{headers[lang].Tue}</label></td><td nowrap="true"><label  htmlFor="wed"> <input onChange={this.handleUpdateWeekday} type="checkbox"  id="wed" name="wed" />{headers[lang].Wed}</label></td>
                </tr>
                <tr width="100%">
                  <td nowrap="true"><label htmlFor="thu"><input onChange={this.handleUpdateWeekday} type="checkbox" id="thu" name="thu"/>{headers[lang].Thu}</label></td><td nowrap="true"><label  htmlFor="fri"><input onChange={this.handleUpdateWeekday} type="checkbox"  id="fri" name="fri"/>{headers[lang].Fri}</label></td>
                 <td nowrap="true"><label htmlFor="sat"><input onChange={this.handleUpdateWeekday} type="checkbox" id="sat" name="sat"/>{headers[lang].Sat}</label></td><td nowrap="true"></td>
               </tr>
             </tbody>
             </table>
         </label>
         </td></tr>
       <tr className="dates"><td colSpan="2"><span id="startdate"></span></td></tr>
         <tr className="dates"><td colSpan="2"><span id="enddate"></span></td></tr>
         <tr><td><button className="btn btn-cancel" >{headers[lang].Cancel}</button></td><td><button className="btn btn-primary" onClick={this.saveFloorPlan}>{headers[lang].Save}</button></td></tr>
    </tbody>
  </table>
  );
 }
}
export default FloorPlan
