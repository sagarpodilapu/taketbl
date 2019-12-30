import React from "react";
import reactCSS from 'reactcss';
import TakeTblParent from './TakeTblParent';

class SectionMenu extends TakeTblParent {
  constructor (props,context){
    super(props);
    this.headers = {
      'en':{
        "Section":"section",
        "SectionPlaceHolder":"section name",
        "barrer":"barrer",
        "Cancel":"Cancel",
        "Ok":"Ok",
        "Copy":"Copy",
        "message":{
                   "Headering":"Section Error",
                   "Empty":"cannot be 0 or empty",
                   "AlreadyExists":" already exists ",
                   "Overlapping": "Section cannot be placed on another section"
        }
      },
      'ru':{
        "Section":"секция",
        "SectionPlaceHolder":"секция название",
        "barrer":"Баррер",
        "Cancel":"Отмена",
        "Ok":"Хорошо",
        "Copy":"копия",
        "message":{
           "Heading":"Ошибка таблицы",
           "Empty":"не может быть 0 или пустым",
           "AlreadyExists":" уже существует ",
           "Overlapping": "Раздел не может быть помещен в другой раздел"
         }
      },
      'be':{
        "Section":"секция",
        "SectionPlaceHolder":"секция название",
        "barrer":"Баррер",
        "Cancel":"Отмена",
        "Ok":"Хорошо",
        "Copy":"копия",
        "message":{
           "Heading":"Ошибка таблицы",
           "Empty":"не может быть 0 или пустым",
           "AlreadyExist":" уже существует ",
           "Overlapping": "Раздел не может быть помещен в другой раздел"
         }

      }
    };
  }
  handleSaveSection = (event) => {
    let message= this.headers[this.state.lang].message;
    this.props.savesection(event,message);
    return false;
  }

  render(){
    const styles = reactCSS({
      'default': {
        swatch: {
          width:"200px"
        },
      }
    });
    let lang = this.state.lang;
    let headers= this.headers;
    return (
          <div id="rightmenusection" className="rightmenusection" onClick={this.handleClick}>
            <div className="dropdown">
               <button view="popup" className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {headers[lang].Section}
              </button>
              <div className="dropdown-menu" style={styles.swatch}  aria-labelledby="dropdownMenu2" view="popup">
               <form className="px-4 py-3" view="popup" noValidate>
                  <div view="popup" className="form-group form-group-sm">
                      <div view="popup" className="input-group input-group-sm mb-3">
                       <div view="popup" className="input-group-prepend">
                         <span view="popup" className="input-group-text" id="basic-addon1"><i className="far fa-question-circle itable smallfont"></i></span>
                       </div>
                       <input  view="popup" autoComplete="off" type="text" className="form-control" required={true} placeholder={headers[lang].SectionPlaceHolder} size="6" type="text" maxLength="10"  aria-describedby="basic-addon1" name="name"/>
                     </div>
                 </div>
                 <div view="popup" className="form-group form-group-sm">
                     <div view="popup" className="input-group input-group-sm mb-3">
                      <div view="popup" className="input-group-prepend">
                        <span view="popup" className="input-group-text" id="basic-addon2"><i className="fas fa-user itable smallfont"></i></span>
                      </div>
                      <input  view="popup" type="text" className="form-control" placeholder={headers[lang].barrer} size="6" type="text" maxLength="10" min="5" aria-describedby="basic-addon2" name="bearer"/>
                    </div>
                </div>
                <div view="popup" className="form-group form-group-sm">
                  <button className="btn btn-cancel mr-1 btn-sm" type="button"  onClick={this.handleClick}>  {headers[lang].Cancel}</button><button type="button" view="popup" className="btn btn-primary btn-sm"   action="savesection"  onClick={this.handleSaveSection} >{headers[lang].Ok}</button>
                </div>
               </form>
               <div className="dropdown-divider"></div>
               <a className="dropdown-item"  href="#">{headers[lang].Copy}</a>
             </div>
           </div>
          </div>
          );
      }

}
export default SectionMenu
