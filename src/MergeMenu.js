import React from "react";
import reactCSS from "reactcss";
import TakeTblParent from "./TakeTblParent";

class MergeMenu extends TakeTblParent {
  constructor(props, context) {
    super(props);
    this.handleMultiSelect = this.handleMultiSelect.bind(this);
    this.headers = {
      en: {
        Table: "Table",
        tableno: "table no",
        seats: "seats",
        section: "section",
        Cancel: "Cancel",
        Ok: "Ok",
        message: {
          Heading: "Table Error",
          Empty: "cannot be 0 or empty",
          AlreadyExist: " already exists "
        }
      },
      ru: {
        Table: "стол",
        tableno: "стол №",
        seats: "место",
        section: "секция",
        Cancel: "Отмена",
        Ok: "Хорошо",
        message: {
          Heading: "стол ошибка",
          Empty: "не может быть 0 или пустым",
          AlreadyExist: " уже существует "
        }
      },
      be: {
        Table: "стол",
        tableno: "стол №",
        seats: "место",
        section: "секция",
        Cancel: "Отмена",
        Ok: "Хорошо",
        message: {
          Heading: "стол ошибка",
          Empty: "не может быть 0 или пустым",
          AlreadyExist: " уже существует "
        }
      }
    };
  }
  handleMultiSelect = event => {
    this.setState({ menu: "multiselect" });
  };
  handleKeyDown = event => {
    if (event && event.keyCode) {
      if (
        event.keyCode === 189 ||
        event.keyCode === 69 ||
        event.keyCode === 190
      ) {
        event.preventDefault();
        return false;
      }
    }
    if (
      event.target &&
      event.target.value &&
      event.target.maxLength &&
      event.target.value.length > event.target.maxLength - 1
    ) {
      if (event.keyCode !== 8) {
        event.preventDefault();
        return false;
      }
    }
  };

  handleCancel = e => {};

  handleSaveTable = event => {
    this.setState({ tableinfo: { tableno: 1, section: "hello" } });
    let message = this.headers[this.state.lang].message;
    this.props.savetable(event, message);
    return false;
  };

  render() {
    let lang = this.state.lang;
    let headers = this.headers;

    const styles = reactCSS({
      default: {
        right: {
          //float:"right"
        }
      }
    });

    return (
      <div
        className="rightmenutbl"
        ref={this.contextRef}
        onClick={this.handleClick}
        view="group"
      >
        <div className="dropdown">
          <button
            view="popup"
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {headers[lang].Table}
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="dropdownMenu2"
            view="popup"
          >
            <form className="px-4 py-3" view="popup" noValidate>
              <div view="popup" className="form-group form-group-sm">
                <div view="popup" className="input-group input-group-sm mb-3">
                  <div view="popup" className="input-group-prepend">
                    <span
                      view="popup"
                      className="input-group-text"
                      id="basic-addon1"
                    >
                      <i className="far fa-question-circle itable smallfont">
                        <label className="required">*</label>
                      </i>
                    </span>
                  </div>
                  <input
                    view="popup"
                    name="tableno"
                    type="number"
                    required={true}
                    className="form-control"
                    size="6"
                    onKeyDown={this.handleKeyDown}
                    placeholder={headers[lang].tableno}
                    maxLength="3"
                    min="1"
                    max="99"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
              <div view="popup" className="form-group form-group-sm">
                <div view="popup" className="input-group input-group-sm mb-3">
                  <div view="popup" className="input-group-prepend">
                    <span
                      view="popup"
                      className="input-group-text"
                      id="basic-addon1"
                    >
                      <i className="fas fa-chair itable smallfont"></i>
                    </span>
                  </div>
                  <input
                    view="popup"
                    name="seats"
                    required={true}
                    type="number"
                    className="form-control"
                    size="6"
                    placeholder={headers[lang].seats}
                    onKeyDown={this.handleKeyDown}
                    maxLength="2"
                    min="1"
                    max="99"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
              <div view="popup" className="form-group form-group-sm">
                <div view="popup" className="input-group input-group-sm mb-3">
                  <div view="popup" className="input-group-prepend">
                    <span
                      view="popup"
                      className="input-group-text"
                      id="basic-addon1"
                    >
                      <i className="fas fa-columns itable smallfont"></i>
                    </span>
                  </div>
                  <input
                    view="popup"
                    name="name"
                    type="text"
                    className="form-control"
                    size="6"
                    readOnly={true}
                    placeholder={headers[lang].section}
                    maxLength="3"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
              <div
                className="btn-group mr-3"
                role="group"
                aria-label="tablesave"
              >
                <button
                  className="btn btn-cancel mr-1 btn-sm"
                  type="button"
                  onClick={this.handleClick}
                >
                  {" "}
                  {headers[lang].Cancel}
                </button>
                <button
                  type="button"
                  view="popup"
                  className="btn btn-primary btn-sm"
                  style={styles.right}
                  action="savetable"
                  onClick={this.handleSave}
                >
                  {headers[lang].Ok}
                </button>
              </div>
            </form>
            <div className="d-none dropdown-menu">
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Merge
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Copy
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MergeMenu;
