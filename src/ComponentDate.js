
import React from "react";

import DatePicker from  "react-datepicker";
//import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import TakeTblParent from './TakeTblParent';
import ru from 'date-fns/locale/ru';

import "./ComponentDate.css";

registerLocale('ru', ru)

class ComponentDate extends TakeTblParent{


  constructor(props,context){
    super(props);
    if (props&& props.headerText){
      this.state.headerText=props.headerText;
      this.headers = {
        'en':{
             "StartDate":"Start Date",
             "EndDate":"End Date"
        },
        'ru':{
          "StartDate":'Дата начала',
          "EndDate":'Дата окончания'
        },
        'be':{
          "StartDate":'Дата начала',
          "EndDate":'Дата окончания'
        }
      }
    }
    if (this.state.lang==='be'){
      this.state.lang='ru';
    }
  }
  handleDateChange = date => {
    this.setState({
      Date: date
    });
  };

  handleTimeChange = time => {
    this.setState({
      Time: time
    });
  };
  render() {
    let lang = this.state.lang;
    let headers = this.headers[lang];
    let text = this.state.headerText;
    let dateText = headers[text];
    return (
      <div view="popup" className="form-group form-group-sm">
        <label >
          {dateText}<i className="fa fa-calendar itable smallfont" aria-hidden="true"></i>:
          <DatePicker
                id={this.state.headerText}
                selected={this.state.Date}
                dateFormat="d.MM.yyyy"
                onChange={this.handleDateChange}
                peekNextMonth={true}
                placeholderText={dateText}
                showMonthDropdown={true}
                showYearDropdown={true}
                required
                locale={this.state.lang}
           />
        </label>
        <label>
          <DatePicker
                id={this.state.headerText+"time"}
                selected={this.state.Time}
                placeholderText="HH:mm"
                showTimeSelect
                showTimeSelectOnly
                dateFormat="HH:mm"
                timeFormat="HH:mm"
                onChange={this.handleTimeChange}
                timeIntervals={15}
                required
                locale={this.state.lang}
           />
        </label>
      </div>

    );
  }
}
export default ComponentDate
